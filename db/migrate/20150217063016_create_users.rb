class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :reset_code
      t.datetime :expires_at

      t.timestamps
    end
  end
end
