class CreatePersonalities < ActiveRecord::Migration[5.0]
  def change
    create_table :personalities do |t|
      t.json :analysis
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
