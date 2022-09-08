package com.ctor.reportEngine.bus.events

import com.ctor.reportEngine.db.entities.Project

class ReportCreatedEvent(projectId: Long): Event(ReportCreatedEvent::class.java.simpleName) {
    var ProjectId = projectId
}