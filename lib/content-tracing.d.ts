// https://github.com/electron/electron/blob/master/docs/api/content-tracing.md

declare namespace Electron {
	/**
	 * This module is used to collect tracing data generated by the underlying Chromium content module.
	 * This module does not include a web interface so you need to open chrome://tracing/
	 * in a Chrome browser and load the generated file to view the result.
	 */
	interface ContentTracing {
		/**
		 * Get a set of category groups. The category groups can change as new code paths are reached.
		 *
		 * @param callback Called once all child processes have acknowledged the getCategories request.
		 */
		getCategories(callback: (categoryGroups: string[]) => void): void;
		/**
		 * Start recording on all processes. Recording begins immediately locally and asynchronously
		 * on child processes as soon as they receive the EnableRecording request.
		 *
		 * @param callback Called once all child processes have acknowledged the startRecording request.
		 */
		startRecording(options: ContentTracingOptions, callback: Function): void;
		/**
		 * Stop recording on all processes. Child processes typically are caching trace data and
		 * only rarely flush and send trace data back to the main process. That is because it may
		 * be an expensive operation to send the trace data over IPC, and we would like to avoid
		 * much runtime overhead of tracing. So, to end tracing, we must asynchronously ask all
		 * child processes to flush any pending trace data.
		 *
		 * @param resultFilePath Trace data will be written into this file if it is not empty,
		 * or into a temporary file.
		 * @param callback Called once all child processes have acknowledged the stopRecording request.
		 */
		stopRecording(resultFilePath: string, callback: (filePath: string) => void): void;
		/**
		 * Start monitoring on all processes. Monitoring begins immediately locally and asynchronously
		 * on child processes as soon as they receive the startMonitoring request.
		 *
		 * @param callback Called once all child processes have acked to the startMonitoring request.
		 */
		startMonitoring(options: ContentTracingOptions, callback: Function): void;
		/**
		 * Stop monitoring on all processes.
		 *
		 * @param callback Called once all child processes have acknowledged the stopMonitoring request.
		 */
		stopMonitoring(callback: Function): void;
		/**
		 * Get the current monitoring traced data. Child processes typically are caching trace data
		 * and only rarely flush and send trace data back to the main process. That is because it may
		 * be an expensive operation to send the trace data over IPC, and we would like to avoid much
		 * runtime overhead of tracing. So, to end tracing, we must asynchronously ask all child
		 * processes to flush any pending trace data.
		 *
		 * @param callback Called once all child processes have acknowledged the captureMonitoringSnapshot request.
		 */
		captureMonitoringSnapshot(resultFilePath: string, callback: (filePath: string) => void): void;
		/**
		 * Get the maximum usage across processes of trace buffer as a percentage of the full state.
		 *
		 * @param callback Called when the TraceBufferUsage value is determined.
		 */
		getTraceBufferUsage(callback: Function): void;
		/**
		 * @param callback Called every time the given event occurs on any process.
		 */
		setWatchEvent(categoryName: string, eventName: string, callback: Function): void;
		/**
		 * Cancel the watch event. This may lead to a race condition with the watch event callback if tracing is enabled.
		 */
		cancelWatchEvent(): void;
	}

	interface ContentTracingOptions {
		/**
		 * Filter to control what category groups should be traced.
		 * A filter can have an optional - prefix to exclude category groups
		 * that contain a matching category. Having both included and excluded
		 * category patterns in the same list is not supported.
		 *
		 * Examples:
		 *   test_MyTest*
		 *   test_MyTest*,test_OtherStuff
		 *   -excluded_category1,-excluded_category2
		 */
		categoryFilter: string;
		/**
		 * Controls what kind of tracing is enabled, it is a comma-delimited list.
		 *
		 * Possible options are:
		 *   record-until-full
		 *   record-continuously
		 *   trace-to-console
		 *   enable-sampling
		 *   enable-systrace
		 *
		 * The first 3 options are trace recoding modes and hence mutually exclusive.
		 * If more than one trace recording modes appear in the traceOptions string,
		 * the last one takes precedence. If none of the trace recording modes are specified,
		 * recording mode is record-until-full.
		 *
		 * The trace option will first be reset to the default option (record_mode set
		 * to record-until-full, enable_sampling and enable_systrace set to false)
		 * before options parsed from traceOptions are applied on it.
		 */
		traceOptions: string;
	}
}
