# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_31_175022) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.bigint "story_id", null: false
    t.integer "selected_possibility_id"
    t.index ["story_id"], name: "index_events_on_story_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "story_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["story_id"], name: "index_memberships_on_story_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "pictures", force: :cascade do |t|
    t.string "event_photo", null: false
    t.bigint "event_id", null: false
    t.bigint "user_id", null: false
    t.index ["event_id"], name: "index_pictures_on_event_id"
    t.index ["user_id"], name: "index_pictures_on_user_id"
  end

  create_table "possibilities", force: :cascade do |t|
    t.string "body", null: false
    t.bigint "event_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_possibilities_on_event_id"
    t.index ["user_id"], name: "index_possibilities_on_user_id"
  end

  create_table "stories", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "private", default: false
    t.index ["user_id"], name: "index_stories_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "possibility_id", null: false
    t.bigint "user_id", null: false
    t.boolean "upvoted", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["possibility_id"], name: "index_votes_on_possibility_id"
    t.index ["user_id", "possibility_id"], name: "index_votes_on_user_id_and_possibility_id", unique: true
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

end
