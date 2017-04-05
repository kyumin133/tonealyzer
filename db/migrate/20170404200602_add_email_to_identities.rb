class AddEmailToIdentities < ActiveRecord::Migration[5.0]
  def change
    add_column :identities, :email, :string
  end
end
