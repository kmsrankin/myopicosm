# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

-----------------------------
User Stories:
As a user,
I would like to view a list of stories,
so that I can decide what type of story I would like to contribute to

Acceptance criteria:
When I visit '/' or '/stories', I should see a list of stories
Each story should be a link to a show page
There should be a button to take me to a new story form page

-----------------------------
User stories:
As a signed-in user,
I would like to be able to create my own stories,
so that I can create a new space for collaboration based on my own ideas

Acceptance criteria:
When I visit '/stories/new', there should be a submission form to add a new story
I should be able to specify whether or not this story is public or private
On successful submission, I should be brought to the show page for the new story
On a failed submission, I should remain on the new form page and errors should appear on the screen

-----------------------------
User stories:
As a user,
I would like to be able to view a story page,
so that I can read what has been written on the story so far

Acceptance criteria:
When I visit 'stories/:id', I should see the most recent events in the story
All prior events should be above on the page or on
Stretch: Each event should be a link

-----------------------------
User stories:
As a user,
I should be able to view event details,
so that I can keep track of contextual elements in the story

Acceptance criteria:
When I visit ('events/:id' or stories/:id/events/:id?) I should see the details of a particular event in the story
I should see a list of possible narrations that will be added to the story

-----------------------------
User stories:
As a contributor,
I should be able to create possibilities for events,
so that the story can continue?

Acceptance criteria:
When I visit 'events/:id' for only the most recently created event, I should see a form to submit a new possibility

Thoughts for implementation:
  -should the user be able to add more than one possibility per event?

-----------------------------
User stories:
As a contributor,
I should be able to vote on possibilities,
so that I can collaboratively decide on which possibility should actually occur in the story

Acceptance criteria:
When I visit 'events/:id' for only the most recently created event, I should be able to vote up to three times on possibilities
If I try to vote a fourth time, I should get a message telling me that I have already voted three times, and that I should deselect a vote in order to vote again.

-----------------------------
As a contributor,
I should be able to share depictions of events in the story,
so that I can share my visualizations with the community





-----------------------------
Stretch Goals
-----------------------------
User stories:
As a user,
I should be able to view a list of characters in a story,
so that I can keep track of everyone in the story

Acceptance criteria:
When I visit 'stories/:id' I should see a list of character names
Each character name should be a link to a show page

-----------------------------
User stories:
As a user,
I should be able to view the details of a character,
so that I can be aware of relevant information about that character

Acceptance criteria:
When I visit 'stories/:id/characters/:id', I should see the current status of that character,
I should also see a historical log of that characters appearances

-----------------------------
User stories:
As a user,
I should be able to view a list of locations in a story,
so that I can keep track of existing locations in the story

Acceptance criteria:
When I visit 'stories/:id', I should see a list of locations relevant to the story
Each location should be a link to a show page

-----------------------------
User stories:
As a user,
I should be able to view the details of a location,
so that I can be aware of story events that occurred there and the state of the location

Acceptance criteria:
When I visit 'stories/:id/events/:id', I should see the current status of that location (and maybe any characters that are there)
I should also see a historical log of events that took place there

-----------------------------
User stories:
As a user,
I should be able to view a list of important items,
so that I can be aware of significant items that might pertain to the plot

Acceptance criteria:
When I visit 'stories/:id/items', I should see a list of items
Each item should be a link to a show page

-----------------------------
User stories:
As a user,
I should be able to view the details of an item,
so that I can keep track of the items significance and location (if known)

Acceptance criteria:
When I visit 'stories/:id/items/:id', I should see the details of a specific item
I should be able to see the history of it's location and ownerships
I should also be able to see significant events it was relevant to
I should also be able to see the current status of the item
