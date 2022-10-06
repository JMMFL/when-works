from datetime import date, datetime, timedelta
from utils import datetime_range
from db import *
from flask import request
from event import Event
from guest import Guest
from guesttime import GuestTime

'''
Returns the current time
'''
@app.route('/time')
def get_current_time():
	return {'time': datetime.now()}

'''
Creates a new event, and returns the JSON format of the event that was created.
Expects a JSON query in the following format:
{
	"event_name":
	"host_name":
	"avail_times": [[start_time1, end_time1], [start_time2 end_time2], ...]
}
Make sure the times are in ISO 8601 format
'''
@app.route('/create', methods=['POST'])
def create_event():
	event_name = request.json['event_name']
	host_name = request.json['host_name']
	avail_times = request.json['avail_times']

	event = Event(event_name, host_name)
	db.session.add(event)
	# db.session.commit()

	# add host as guest
	guest = Guest(host_name, event.id)
	event.host_id = guest.id

	for time_frame in avail_times:
		start_time = datetime.fromisoformat(time_frame[0])
		end_time = datetime.fromisoformat(time_frame[1])
		
		expanded_time_frame = datetime_range(start_time, end_time, timedelta(minutes=30))

		for time in expanded_time_frame:
			guestTime = GuestTime(guest.id, event.id, time)
			db.session.add(guestTime)
			guest.available_times.append(guestTime)

	db.session.add(guest)
	db.session.commit()
	return event.formatJSON()

'''
Get a JSON of all events
'''
@app.route('/event', methods=['GET'])
def get_events():
	events = Event.query.order_by(Event.id.asc()).all()
	event_list = []
	for event in events:
		event_list.append(event.formatJSON())
	return {'events': event_list}

'''
Creates a new guest, and returns the JSON format of the guest that was created
Expects a JSON query in the following format:
{
	"guest_name":
	"avail_times": [[start_time1, end_time1], [start_time2 end_time2], ...]
}
Make sure the times are in ISO 8601 format
'''
@app.route('/<event_id>', methods=['POST'])
def create_guest(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return f"Event ID {event_id} does not exist"

	name = request.json['guest_name']
	avail_times = request.json['avail_times']

	# add guest to database
	guest = Guest(name, event_id)

	for time_frame in avail_times:
		start_time = datetime.fromisoformat(time_frame[0])
		end_time = datetime.fromisoformat(time_frame[1])
		
		expanded_time_frame = datetime_range(start_time, end_time, timedelta(minutes=30))

		for time in expanded_time_frame:
			guestTime = GuestTime(guest.id, event.id, time)
			db.session.add(guestTime)
			guest.available_times.append(guestTime)

	db.session.add(guest)
	db.session.commit()
	return guest.formatJSON()

'''
Get a JSON of a single element
'''
@app.route('/<event_id>', methods=['GET'])
def get_event(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return f"Event ID {event_id} does not exist"

	return event.formatJSON()

'''
Get a JSON of a single guest in an event
'''
@app.route('/<event_id>/<guest_id>', methods=['GET'])
def get_guest(event_id, guest_id):
	guest = Guest.query.filter_by(id=guest_id).first()
	if (guest == None or guest.event_id != event_id):
		return "This guest either does not exist, or does not belong to this event.\n"

	return guest.formatJSON()

'''
Get a JSON of all guests in an event
'''
@app.route('/<event_id>/guests', methods=['GET'])
def get_guests(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event == None): return "Event does not exist."
	
	guest_list = []
	for guest in event.guests:
		guest_list.append(guest.formatJSON())

	return guest_list

@app.route('/<event_id>/update/<host_id>', methods=['PUT'])
def update_event(event_id, host_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event == None): return "Event does not exist."

	host = Guest.query.filter_by(id=host_id).first()
	if (host == None or event.host_id != host_id): return "Incorrect host id."

	updated_times = request.json['avail_times']

	for host_time in host.available_times:
		db.session.delete(host_time)

	for time_frame in updated_times:
		start_time = datetime.fromisoformat(time_frame[0])
		end_time = datetime.fromisoformat(time_frame[1])
		
		expanded_time_frame = datetime_range(start_time, end_time, timedelta(minutes=30))

		for time in expanded_time_frame:
			host_time = GuestTime(host_id, event_id, time)
			db.session.add(host_time)
			host.available_times.append(host_time)

	# if any of the other guests' times are not in the range same
	#	as the host times, delete it

	# for guest in event.guests:
	# 	delete_flag = False
	# 	for time in guest.available_times:
	# 		for time_frame in updated_times:
	# 			if time < 
	
	pass

@app.route('/<event_id>/update/<guest_id>', methods=['PUT'])
def update_guest(event_id, guest_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event == None): return "Event does not exist."

	guest = Guest.query.filter_by(id=guest_id).first()
	if (guest == None): return "Guest does not exist."

	updated_times = request.json['avail_times']

	for guest_time in guest.available_times:
		db.session.delete(guest_time)

	for time_frame in updated_times:
		start_time = datetime.fromisoformat(time_frame[0])
		end_time = datetime.fromisoformat(time_frame[1])
		
		expanded_time_frame = datetime_range(start_time, end_time, timedelta(minutes=30))

		for time in expanded_time_frame:
			guest_time = GuestTime(guest_id, event_id, time)
			db.session.add(guest_time)
			guest.available_times.append(guest_time)

	db.session.commit()

	return guest.formatJSON()

'''
Delete an event
'''
@app.route('/<event_id>', methods=['DELETE'])
def delete_event(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return "Event does not exist"
	guests = Guest.query.filter_by(event_id=event_id)

	for guest in guests:
		for guest_time in guest.available_times:
			db.session.delete(guest_time)
		db.session.delete(guest)

	db.session.delete(event)
	db.session.commit()

	return 'Event Removed'

'''
Delete a guest in an event
'''
@app.route('/<event_id>/<guest_id>', methods=['DELETE'])
def delete_guest(event_id, guest_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return "Event does not exist"

	guest = Guest.query.filter_by(id=guest_id).first()
	if (guest is None):
		return 'Guest does not exist'

	if (guest.event_id != event_id):
		return 'Guest does not belong to this event'

	for guest_time in guest.available_times:
		db.session.delete(guest_time)

	db.session.delete(guest)
	db.session.commit()
	return 'Guest Removed'

@app.route('/<event_id>/results/', methods=['GET'])
def get_results(event_id):
	event = Event.query.filter_by(id=event_id).first()
	guests = event.guests

	sets = []
	for guest in guests:
		times = []
		for time in guest.available_times:
			times.append(str(time.time))
		sets.append(set(times))
	
	u = set.intersection(*sets)
	times = list(u)
	times.sort()
	
	return {"avail_times": str(times)}
