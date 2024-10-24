# Extended Script for Premiere Pro CC 2024

This script is designed to automatically cut multicam sequences by switching to random cameras at variable intervals. You can adjust the number of cameras, assign priorities to each, and customize the intervals between cuts.

## Features
**Multicam Switching:** Randomly cuts between cameras based on assigned weights (priority). <br>
**Customizable Camera Priorities:** Higher weight values make a camera appear more frequently and have longer durations. <br>
**Flexible Cutting Intervals:** Intervals between camera cuts are randomized, with adjustable minimum and maximum durations. <br>
**Frame Rate Compatibility:** Adjust the timeTicks variable based on the FPS (frames per second) of your sequence. <br>

## Usage Instructions
**Change the Number of Cameras:** Modify the *numCameras* variable to set how many cameras are available. <br>

**Set Camera Priorities:** Adjust the weights array to assign different priorities to each camera. Cameras with higher weights will appear more frequently and have slightly longer durations. <br>

**Adjust TimeTicks for FPS:** <br>

For **59.97 FPS** use **4233600000** <br>
For **25 FPS** use **254016000000**
<br><br>
Change the timeTicks value accordingly depending on the frame rate of your sequence.

## Installation
You can install and run the script using Adobe's ExtendScript Toolkit.
Alternatively, use Visual Studio Code with the Adobe Extended Script extension for easier script editing and execution. You can download the toolkit from here.

## Notes
**Make sure to set the in and out points of your sequence correctly before running the script**, as it will cut from the in-point to the out-point.
Ensure that the frame rate of your sequence is set correctly to avoid timing mismatches in the cuts.
Avoid setting weights to zero unless you don't want a specific camera to appear in the sequence.
