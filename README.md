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

# DB設計

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|references :user|null: false, foreign_key: true|
|group_id|references :group|null: false, foreign_key: true|

### Associtation
- belongs_to :group
- belongs_to :user

## messages table
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|references :user|null: false, foreign_key: true|
|group_id|references :group|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

