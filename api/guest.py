from db import *
from utils import gen_key
from event import Event

class Guest(db.Model):
	key = db.Column(db.Integer, primary_key=True)
	id = db.Column(db.String(7), nullable=False, unique=True)
	name = db.Column(db.String(100), nullable=False)
	event_id = db.Column(db.String(7), db.ForeignKey('event.id'), nullable=False)
	available_times = db.relationship('GuestTime', backref = 'guests')

	def __repr__(self):
		return f"Guest: ID = {self.id}, Event ID = {self.event_id}, Host Name = {self.name}"

	def __init__(self, name, event_id):
		self.name = name
		self.event_id = event_id
		self.id = gen_key()

	def formatJSON(self):
		times = []
		for time in self.available_times:
			times.append(str(time))

		return {
			"id": self.id,
			"guest_name": self.name,
			"event_id": self.event_id,
			"event_name": (Event.query.filter_by(id=self.event_id).first()).event_name,
			"avail_times": times
	}