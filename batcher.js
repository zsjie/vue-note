function Batcher () {
	this.reset()
}

var BatcherProto = Batcher.prototype

BatcherProto.push = function (job) {
	if (!job.id || !this.has[job.id]) {
		this.queue.push(job)
		this.has[job.id] = job
		if (!this.waiting) {
			this.waiting = true
			utils.nextTick(utils.bind(this.flush, this))
		}
	} else if (job.override) {
		var oldJob = this.has[job.id]
		oldJob.cancelled = true
		this.queue.push(job)
		this.has[job.id] = job
	}
}

BatcherProto.flush = function () {
	// before flush hook
	if (this._preFlush) this._preFlush()
	// do not cache length because more jobs might be pushed
	// as we excute existing jobs
	for (var i = 0; i < this.queue.length; i++) {
		var job = this.queue[i]
		if (!job.cancelled) {
			job.execute()
		}
	}
	this.reset()
}

BatcherProto.reset = function () {
	this.has = Object.create(null)
	this.queue = []
	this.waiting = false 
}
