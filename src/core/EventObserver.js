class EventObserver {
  constructor() {
    this.eventListeners = {}
    return (EventObserver.instance = EventObserver.instance || this)
  }

  subscribe(eventName, callback) {
    this.eventListeners[eventName] = this.eventListeners[eventName] || []
    this.eventListeners[eventName].push(callback)
    return this
  }

  unsubscribe(eventName, callback) {
    const listener = this.eventListeners[eventName]
    if (!listener) return this
    this.eventListeners[eventName] = this.eventListeners[eventName].filter(
      (eventCallback) => callback !== eventCallback
    )
    return this
  }

  emit(eventName, args) {
    const event = this.eventListeners[eventName]
    if (!event) return false
    event && event.forEach((callback) => callback.call(null, args))
    return true
  }

  // Attach event listener
  on(eventName, callback) {
    return this.subscribe(eventName, callback)
  }

  // Attach event handler only once. Automatically removed.
  once(eventName, callback) {
    this.eventListeners[eventName] = this.eventListeners[eventName] || []
    const onceWrapper = () => {
      callback()
      this.unsubscribe(eventName, onceWrapper)
    }
    this.eventListeners[eventName].push(onceWrapper)
    return this
  }

  listenersCount(eventName) {
    const listeners = this.eventListeners[eventName] || []
    return listeners.length
  }
}

export const EventsObserver = new EventObserver()
