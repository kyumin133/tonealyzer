class CreateBlurbs < ActiveRecord::Migration[5.0]
  def change
    create_table :blurbs do |t|
      t.text :body, null: false
      t.json :analysis
      t.integer :user_id, null: false
      t.timestamps
    end
    # add_index :blurbs, [:body, :user_id], :unique => true
  end
end
