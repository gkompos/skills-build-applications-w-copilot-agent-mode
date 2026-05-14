from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from pymongo import MongoClient
from octofit_tracker.models import Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        # Delete existing data using pymongo directly to avoid djongo ObjectId hashing bug
        client = MongoClient('mongodb://localhost:27017/')
        db = client['octofit_db']
        db['octofit_tracker_leaderboard'].drop()
        db['octofit_tracker_activity'].drop()
        db['octofit_tracker_user'].drop()
        db['octofit_tracker_team'].drop()
        db['octofit_tracker_workout'].drop()
        client.close()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (super heroes)
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='hero1234', team=marvel)
        cap = User.objects.create_user(username='captainamerica', email='captainamerica@marvel.com', password='hero1234', team=marvel)
        blackwidow = User.objects.create_user(username='blackwidow', email='blackwidow@marvel.com', password='hero1234', team=marvel)
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='hero1234', team=dc)
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='hero1234', team=dc)

        # Create Activities
        Activity.objects.create(user=ironman, type='run', duration=30, distance=5.0)
        Activity.objects.create(user=cap, type='cycling', duration=45, distance=15.0)
        Activity.objects.create(user=blackwidow, type='swim', duration=20, distance=1.5)
        Activity.objects.create(user=batman, type='run', duration=35, distance=7.0)
        Activity.objects.create(user=superman, type='flight', duration=10, distance=100.0)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes')
        Workout.objects.create(name='Strength Training', description='Strength for all heroes')
        Workout.objects.create(name='Agility Drills', description='Agility and speed training')

        # Create Leaderboard entries
        Leaderboard.objects.create(team=marvel, points=300)
        Leaderboard.objects.create(team=dc, points=250)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))