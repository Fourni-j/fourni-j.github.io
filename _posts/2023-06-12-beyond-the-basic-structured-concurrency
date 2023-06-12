---
layout: post
title: 'WWDC23 Recap - Beyond the basics of structured concurrency'
tags: [Swift, Xcode, iOS dev]
featured_image_thumbnail: 
featured_image: 
---

# Beyond the basics of structured concurrency

[https://developer.apple.com/videos/play/wwdc2023/10170/](https://developer.apple.com/videos/play/wwdc2023/10170/)

### Task hierarchy

Concurrent execution is triggered when 

```swift
// Structured concurrency
async let future = ...

taskGroup.addTask {
	...
}

// Unstructured concurrency
Task { ... }

Task.detached { ... }
```

Prefer structured task

### Task cancellation

Structured task are cancelled implicitly when leaving scope

```swift
// Polling
Task.isCancelled 
try Task.checkCancellation()

// Event-Driven
withTaskCancellationHandler(operation:, onCancel:)
```

```swift
// Cancellation and AsyncSequences

private final class OrderState: Sendable {
	let protectedIsRunning = ManagedAtomic<Bool>(true)
	var isRunning: Bool {
		get { protectedIsRunning.load(ordering: .acquiring) }
		set { protectedIsRunning.store(newValue, ordering: .relaxed) }
	}

	func cancel() {
		isRunning = false
	}
}
```

Propagates through the task tree

Seamlessly integrates with throwing errors

Event-driven cancellation handlers or explicit polling

### Task priority

By default child task inherit priority from parent

Structured priority escalation

- Lower priority tasks escalate priority when awaited on by a higher priority task
- Escalation propagates through the task tree
- Priority remains escalated until the task completes

### Task group patterns

DiscardingTaskGroup releases resources immediately on task completion

Use the completion of one task to signal the creation of the next in a TaskGroup

### Task-local values

```swift
// Task-local values
// Associating values with task trees
actor Kitchen {
	@TaskLocal static var orderID: Int?
	@TaskLocal static var cook: String?
	
	func logStatus() {
		print("Current cook: \(kitchen.cook ?? "none")")
	}
}

let kitchen = Kitchen()
await kitchen.logStatus() // Current cook: none
await Kitchen.$cook.withValue("Sakura") {
	await kitchen.logStatus() // Current cook: Sakura
}
await kitchen.logStatus() // Current cook: none
```

Attach metadata to the current task

Inherited by child tasks as well as `Task` {}

Low-level building block for context propagation

### Task traces

Local profiling with Instruments

Swift Distributed Tracing

- Open source package for server ecosystem
- Provides an extensible instrumentation API
- Similar to Swift Log and Swift Metrics
