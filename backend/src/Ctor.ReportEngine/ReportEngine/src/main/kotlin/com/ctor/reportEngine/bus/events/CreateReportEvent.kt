package com.ctor.reportEngine.bus.events

class CreateReportEvent(var CompanyId: Long, var ProjectId: Long): Event(CreateReportEvent::class.java.simpleName) {
}