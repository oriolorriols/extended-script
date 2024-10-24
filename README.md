    <h1>Extended Script for Premiere Pro CC 2024</h1>

    <p>This script is designed to <strong>automatically cut multicam sequences</strong> by switching to random cameras at variable intervals. You can adjust the number of cameras, assign priorities to each, and customize the intervals between cuts.</p>

    <h2>Features</h2>
    <ul>
        <li><strong>Multicam Switching:</strong> Randomly cuts between cameras based on assigned weights (priority).</li>
        <li><strong>Customizable Camera Priorities:</strong> Higher weight values make a camera appear more frequently and have longer durations.</li>
        <li><strong>Flexible Cutting Intervals:</strong> Intervals between camera cuts are randomized, with adjustable minimum and maximum durations.</li>
        <li><strong>Frame Rate Compatibility:</strong> Adjust the <code>timeTicks</code> variable based on the FPS (frames per second) of your sequence.</li>
    </ul>

    <h2>Usage Instructions</h2>
    <ol>
        <li><strong>Change the Number of Cameras:</strong> Modify the <code>numCameras</code> variable to set how many cameras are available.</li>
        <li><strong>Set Camera Priorities:</strong> Adjust the <code>weights</code> array to assign different priorities to each camera. Cameras with higher weights will appear more frequently and have slightly longer durations.</li>
        <li><strong>Adjust TimeTicks for FPS:</strong> 
            <ul>
                <li>For <strong>59.97 FPS</strong> use <code>4233600000</code></li>
                <li>For <strong>25 FPS</strong> use <code>254016000000</code></li>
            </ul>
            Change the <code>timeTicks</code> value accordingly depending on the frame rate of your sequence.
        </li>
        <li><strong>Installation:</strong>
            <ul>
                <li>You can install and run the script using Adobe's <strong>ExtendScript Toolkit</strong>.</li>
                <li>Alternatively, use <strong>Visual Studio Code</strong> with the <strong>Adobe Extended Script extension</strong> for easier script editing and execution. You can download the toolkit from <a href="https://github.com/Adobe-CEP/CEP-Resources/blob/master/ExtendScript-Toolkit/AdobeExtendScriptToolkit_4_LS22.exe" target="_blank">here</a>.</li>
            </ul>
        </li>
    </ol>

    <h2>Notes</h2>
    <ul>
        <li>Make sure to set the in and out points of your sequence correctly before running the script, as it will cut from the in-point to the out-point.</li>
        <li>Ensure that the frame rate of your sequence is set correctly to avoid timing mismatches in the cuts.</li>
        <li>Avoid setting weights to zero unless you don't want a specific camera to appear in the sequence.</li>
    </ul>

    <p>With these instructions, you should be able to modify and run the script effectively to meet your editing needs.</p>
