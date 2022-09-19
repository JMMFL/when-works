from datetime import datetime
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
	"avail_times":
}
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

	# add time to database
	for time in avail_times:
		guestTime = GuestTime(guest.id, event.id, time)
		db.session.add(guestTime)

		# add relationship to join table
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
	"avail_times":
}
'''
@app.route('/<event_id>', methods=['POST'])
def create_guest(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return f"Event ID {event_id} does not exist"

	name = request.json['guest_name']
	avail_times = request.json['avail_times']

	# add guest to database
	guest = Guest(name, event_id)

	# add time to database
	for time in avail_times:
		guestTime = GuestTime(guest.id, event.id, time)
		db.session.add(guestTime)

		# add relationship to join table
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

'''
Delete an event
'''
@app.route('/<event_id>', methods=['DELETE'])
def delete_event(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return "Event does not exist"
	guests = Guest.query.filter_by(event_id=event_id)

	for guest in guests:
		for guesttime in guest.available_times:
			db.session.delete(guesttime)
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

	for guesttime in guest.available_times:
		db.session.delete(guesttime)

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
	print(sets)
	u = set.intersection(*sets)
	times = list(u)
	
	return {"avail_times": str(times)}
