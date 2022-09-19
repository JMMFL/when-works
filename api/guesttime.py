from db import *
from event import Event
from guest import Guest

class GuestTime(db.Model):
	key = db.Column(db.Integer, primary_key=True)
	guest_id = db.Column(db.String(7), db.ForeignKey('guest.id'), nullable=False)
	event_id = db.Column(db.String(7), db.ForeignKey('event.id'), nullable=False)
	time = db.Column(db.DateTime, nullable=False)

	def __repr__(self):
		return f"Guest: ID = {self.id}, Event ID = {self.event_id}, Time = {str(self.time)}"

	def __init__(self, guest_id, event_id, time):
		self.guest_id = guest_id
		self.event_id = event_id
		self.time = time
	