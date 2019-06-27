# Myopicosm
Myopicosm is a collaborative and experimental story-telling framework with a Ruby on Rails back end, a PostgreSQL database, and a React front end. This simple application enables users to submit narrations and vote to determine what should happen next in a story. The current mechanism of progressing the story relies on the story owner clicking a button that adds up the votes and assigns the winning 'possibility' to the associated event.

I created Myopicosm as my 2-week 'breakable toy' project at end of Launch Academy's 18 week immersive program. It is a thorough representation of the skills that I learned during my time as a bootcamp student.

## Features:
* Create / read public or private stories
* Create / read / update events
* Create / read possibilities
* Create memberships to stories
* Upload images to S3 bucket
* Built in Thesaurus through API endpoint from Big Huge Labs

## Testing
Myopicosm's test suite currently consists of comprehensive unit tests. These tests can be run with `bundle exec rspec`. Since most of the front end is written in React, enzyme tests are a high priority task for future commits.
