---
title: "Getting LWIP to work on Zynq The Right Way"
date: "2023-06-25"
slug: "lwip-on-zynq"
description: "Refactoring Xilinx's example"
---

You've included LWIP in you board support package and imported an example project provided by Xilinx, perhaps the echo server. Then, ideally, you got rid of preprocessor definitions and conditionals that are there to make the example work on multiple platforms. A good start but still a lot to decipher!

For months I treated the example platform setup code as perfectly working library code. Well, it did work, but I had no idea how. As uncle Bob's heuristic G21 states, we must 'understand the algorithm'. And so I started rearranging the pieces and removing some. Let me walk you through.

In the main loop is this group of conditionals that feed LWIP's timers. Get rid of them. You'll see that nothing changes. This is because the example code feeds the DHCP timer in the interrupt callback which, as a side effect, makes TCP work too. And why use flags for some timers when using flags for others? Let's refactor this to use flags for all timers. This will make our code more consistent and keep our interrupt callback shorter. If you're not using DHCP, just get rid of its timer call altogether, and remove the preprocessor conditionals if you're using it.

```c
volatile int tcp_timer_fast_flag = 0;
volatile int tcp_timer_slow_flag = 0;

void timer_callback(XScuTimer* scu_timer){
	
	static int odd = 1;
	odd = !odd;
	
	tcp_timer_fast_flag = 1; // every 250ms
	
	if(odd){
	
		tcp_timer_slow_flag = 1;  // every 500ms
	}
	
	XScuTimer_ClearInterruptStatus(scu_timer);
}
```

What about the call to `xemacpsif_resetrx_on_no_rxdata()`? It is there as a workaround to a hardware bug that makes the network line halt under heavy receive traffic. I recommend getting rid of it for the time being and testing your system under heavy network traffic once everything is in a more mature state (This is what I did. An update will come when the system I'm working on is in that state).

Make sure you don't `extern` the flag variables by defining them in a header to allow them to be simply imported.

We no longer call LWIP's timer callbacks in our interrupt, but only change values of variables. Calling the functions will be the responsibility of the main network loop (ideally part of a network module):

```c
void network_update(){
	
	if(tcp_timer_fast_flag == 1){
	
		tcp_fasttmr();
		tcp_timer_fast_flag = 0;
	}
	
	if(tcp_timer_slow_flag == 1){
	
		tcp_slowtmr();
		tcp_timer_slow_flag = 0;
	}
	
	xemacif_input(&network_interface);
}

while(1){

	//...
	network_update();
	//...
}
```

There's another simplification we can make: Using `tcp_tmr()` instead of `tcp_slwtmr() ` and `tcp_fasttmr()`. Calling the first every 250ms is enough as it does calling the latter every other time for us. With this change, our interrupt looks like this:

```c
volatile int tcp_timer_flag = 0;

/*
 * Fires every 250ms.
 */
void timer_callback(XScuTimer* scu_timer){
	
	tcp_timer_flag = 1;
	XScuTimer_ClearInterruptStatus(scu_timer);
}
```

And our `network_update()` function like this:

```c
void network_update(){
	
	if(tcp_timer_flag == 1){
	
		tcp_tmr();
		tcp_timer_flag = 0;
	}
	
	xemacif_input(&network_interface);
}
```

Much cleaner!
