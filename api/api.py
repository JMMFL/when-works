from time import time
from flask import Flask, request
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:hellothere@localhost/when-works'
db = SQLAlchemy(app)

class Event(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	event_name = db.Column(db.String(100), nullable=False)
	host_name = db.Column(db.String(100), nullable=False)
	created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	num_guests = db.Column(db.Integer, default=1, nullable=False)
	guests = db.relationship('Guest', backref='event')


	def __repr__(self):
		return f"Event: ID = {self.id}, Event Name = {self.event_name}, Host Name = {self.host_name}"

	def __init__(self, event_name, host_name):
		self.event_name = event_name
		self.host_name = host_name

guest_time = db.Table('guest_time', 
	db.Column('guest_id', db.Integer, db.ForeignKey('guest.id')),
	db.Column('time_id', db.DateTime, db.ForeignKey('time.time_id'))
)

class Guest(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100), nullable=False)
	event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
	available_times = db.relationship('Time', secondary=guest_time, backref = 'guests')

	def __repr__(self):
		return f"Guest: ID = {self.id}, Event Name = {self.event_id}, Host Name = {self.name}"

	def __init__(self, name, event_id):
		self.name = name
		self.event_id = event_id

class Time(db.Model):
	time_id = db.Column(db.DateTime, primary_key=True, nullable = False)

	def __repr__(self):
		return f"{self.time_id}"

	def __init__(self, time):
		self.time_id = time

def format_event(event):
	names = []
	guests = Guest.query.filter_by(event_id=event.id)
	for guest in guests:
		names.append(guest.name)

	return {
		"id": event.id,
		"event_name": event.event_name,
		"host_name": event.host_name,
		"num_guests": event.num_guests,
		"created_at": event.created_at,
		"guests": names
	}


def format_guest(guest):
	times = []
	avail_times = guest.available_times
	for time in avail_times:
		times.append(str(time))

	return {
		"id": guest.id,
		"guest_name": guest.name,
		"event_id": guest.event_id,
		"event_name": (Event.query.filter_by(id=guest.event_id).first()).event_name,
		"avail_times": times
	}

@app.route('/time')
def get_current_time():
	return {'time': datetime.now()}

@app.route('/create', methods=['POST'])
def create_event():
	event_name = request.json['event_name']
	host_name = request.json['host_name']
	avail_times = request.json['avail_times']

	event = Event(event_name, host_name)
	db.session.add(event)
	db.session.commit()

	# add host as guest
	guest = Guest(host_name, event.id)

	# add time to database
	for time in avail_times:
		tmp_time = Time.query.filter_by(time_id=time).first()
		if (tmp_time is None):
			db.session.add(Time(time))
			tmp_time = Time.query.filter_by(time_id=time).first()
		guest.available_times.append(tmp_time)

	db.session.add(guest)
	event.num_guests += 1
	db.session.commit()
	return format_event(event)

@app.route('/event', methods=['GET'])
def get_events():
	events = Event.query.order_by(Event.id.asc()).all()
	event_list = []
	for event in events:
		event_list.append(format_event(event))
	return {'events': event_list}

@app.route('/<event_id>', methods=['POST'])
def create_guest(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return f"Event ID {event_id} does not exist"

	name = request.json['guest_name']
	avail_times = request.json['avail_times']

	# add guest to database
	guest = Guest(name, event_id)

	# add time to database if it doesnt exist, and add
	#	relationship to join table
	for time in avail_times:
		tmp_time = Time.query.filter_by(time_id=time).first()
		if (tmp_time is None):
			db.session.add(Time(time))
			tmp_time = Time.query.filter_by(time_id=time).first()
		guest.available_times.append(tmp_time)

	db.session.add(guest)
	# event is initialized with num_guests = 1
	db.session.commit()
	return format_guest(guest)

@app.route('/<event_id>', methods=['GET'])
def get_event(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return f"Event ID {event_id} does not exist"
	return format_event(event)

@app.route('/<event_id>', methods=['DELETE'])
def delete_event(event_id):
	event = Event.query.filter_by(id=event_id).first()
	if (event is None): return "Event does not exist"
	guests = Guest.query.filter_by(event_id=event_id)
	for guest in guests:
		db.session.delete(guest)
	db.session.delete(event)
	db.session.commit()
	return 'Event Removed'

@app.route('/<event_id>/<guest_id>', methods=['DELETE'])
def delete_guest(event_id, guest_id):
	event = Event.query.filter_by(id=event_id).first()
	guest = Guest.query.filter_by(id=guest_id).first()
	event.num_guests -= 1
	db.session.delete(guest)
	db.session.commit()
	return 'Guest Removed'

@app.route('/<event_id>/<guest_id>', methods=['GET'])
def get_guest(event_id, guest_id):
	guest = Guest.query.filter_by(id=guest_id).first()
	if (guest == None or guest.event_id is not event_id):
		return "This guest either does not exist, or does not belong to this event.\n"
	return format_guest(guest)

