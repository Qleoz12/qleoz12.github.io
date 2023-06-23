require "google_drive"
require "debug"

module Reading
    class Generator < Jekyll::Generator
        def generate(site)
            
            # credentials = Google::Auth::UserRefreshCredentials.new(
            #     client_id: "-.apps.googleusercontent.com",
            #     client_secret:"-"
            #   )

            # session = GoogleDrive::Session.from_credentials(credentials)
            # # print(session)
            # # # # Gets list of remote files.
            # session.files.each do |file|
            #     print file.title
            # end
            # reading = site.pages.find { |page| page.name == 'certs.html'}
            # puts reading
            # # Access the data stored in the _data directory
            # my_data = site.data['certs'] || {}
            # puts  my_data 
            # # Update or add your desired data
            # my_data['key'] = 'value'
            
            # # Write the updated data back to the _data directory
            # site.data['certs'] = my_data
            # # reading.data['certs'] = ["as","as"]

            # puts my_data
            # puts site.data['certs']
            puts Dir.pwd

            session = GoogleDrive::Session.from_service_account_key("./_plugins/config.json")

            # session.files.each do |file|
            #     puts file.title
            #     puts file.resource_id
            #     puts file.document_feed_url
            #     puts file.resource_type
            #     # file.human_url=file.human_url.sub("view", "preview")
            #     puts file.human_url
                
            #     if file.resource_type=='file'
            #       # debugger
            #       my_data.push file.human_url.sub("view", "preview")
            #     end
            #     # debugger
            #     # donwload=file.download_to_string
                
            #     # puts donwload
            #     puts
            # end
            # puts my_data
            
            data={}
            session.files.each do |file|
                if file.resource_type=='folder'
                    puts file.resource_id,file.title
                    puts 
                    childs= session.files(q: "'#{file.resource_id[file.resource_id.rindex(":")+1..-1]}' in parents ")

                    childstrasnformed=[]
                    childs.each do |file|
                        childstrasnformed.push({"human_url"=>file.human_url.sub("view", "preview"),"title"=> file.title })
                    end
                    # debugger
                    data[file.title]=childstrasnformed
                    # debugger
                end
            end 
            # puts data
            
            # inject data into template
            site.data['certs'] = data

        end
    end
end