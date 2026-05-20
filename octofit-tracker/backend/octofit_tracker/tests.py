from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class SimpleModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create(name='Test', email='test@example.com', team='Marvel')
        self.assertEqual(user.name, 'Test')
    def test_team_creation(self):
        team = Team.objects.create(name='TestTeam')
        self.assertEqual(team.name, 'TestTeam')
    def test_activity_creation(self):
        activity = Activity.objects.create(user_email='test@example.com', type='Run', duration=30)
        self.assertEqual(activity.type, 'Run')
    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(user_email='test@example.com', points=10)
        self.assertEqual(lb.points, 10)
    def test_workout_creation(self):
        workout = Workout.objects.create(name='TestWorkout', difficulty='Alta')
        self.assertEqual(workout.difficulty, 'Alta')
