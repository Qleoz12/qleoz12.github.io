---

title:  "Integrating Jekyll with Google Drive API"
search: false
categories: 
  - rubby/jekyll
date: 2023-06-22
last_modified_at: 2023-06-22T10:06:00-05:00
share: linkedin
---

## Introduction

In this post, we will explore how to connect your Jekyll-powered personal 
blog with a Google Drive public folder. 
The goal is to easily share PDFs or documents by displaying them on a page of 
my blog. By utilizing Jekyll's static site generation capabilities and plugins, 
we can automate the process of adding new certifications documents without having to 
manually code each time. Let's dive in! (final result [certs](https://qleoz12.github.io/certs/))

## Jekyll and Ruby

To accomplish this task, we can leverage Jekyll's plugin system, 
which allows us to extend its functionality. There are various types of 
plugins available in Jekyll, including generators, converters, commands, tags, 
filters, and hooks. More information on Jekyll plugins can be found [here](https://jekyllrb.com/docs/plugins/).

## Creating a Generator Plugin for Jekyll

To begin, we need to create a generator plugin for Jekyll. Here's the recipe 
to complete the task:

### Enable the Google Drive API

1. Go to the Google APIs Console.
2. Create a new project.
3. Enable the Google Drive API by searching for it and enabling it.
4. Create credentials for a web server to access application data.
5. Name the service account and grant it a Project Role of Editor.
6. Download the JSON file containing the credentials.

### Connect Google API with Jekyll

To connect Jekyll with the Google Drive API, follow these steps:

1. Install the `google_drive` gem by adding `gem "google_drive"` to your Gemfile.
2. Create a session using the JSON file obtained from the Google API.
3. Iterate through the list of available folders in your project.
4. Filter the folders to create a page that displays the folder name and its containing PDFs.
5. Filter the contents of each folder, listing the files using query parameters.
6. Transform the filtered children into an array of hash objects, containing the file name and public URL.
7. Create another hash array using the folder name as the key and the array of files as the value.
8. Inject the data read from the Google API into the Jekyll context to be processed for a custom page.

Here's an example implementation of the generator plugin:

#### Plugin (generator.rb)

```ruby
require "google_drive"

module Jekyll
  module GoogleDriveGenerator
    class Generator < Jekyll::Generator
      def generate(site)
        session = GoogleDrive::Session.from_service_account_key("./_plugins/config.json")
        data = {}
        
        session.files.each do |file|
          if file.resource_type == 'folder'
            childs = session.files(q: "'#{file.resource_id[file.resource_id.rindex(":")+1..-1]}' in parents ")
            childstrasnformed = []
            
            childs.each do |child|
              childstrasnformed.push({
                "human_url" => child.human_url.sub("view", "preview"),
                "title" => child.title
              })
            end
            
            data[file.title] = childstrasnformed
          end
        end

        # Inject data into template
        site.data['certs'] = data
      end
    end
  end
end
```

#### Template (index.html)

```liquid
{% raw %}
<div class="feature__wrapper">
  {% for link_hash in site.data.certs %}
    <header class="title-set-course">{{ link_hash[0] }}</header>
    {% for link in link_hash[1] %}
      <iframe src="{{ link.human_url }}" width="300"></iframe>
      <a href="{{ link.human_url }}">{{ link.title }}</a>
      <br>
    {% endfor %}
  {% endfor %}
</div>
{% endraw %}
```
I dedicated two days to researching and working on this task. 
I thoroughly enjoyed this journey and the learning experience it provided. 
I hope the code and information 
I have shared can be a valuable reference for others and be utilized for different purposes.

## References

- [YouTube - Twilio: Google Spreadsheets and Ruby](https://www.youtube.com/watch?v=VqoSUSy011I&ab_channel=Twilio)
- [Twilio Blog - Google Spreadsheets and Ruby](https://www.twilio.com/blog/google-spreadsheets-ruby-html)
- [GitHub - gimite/google-spreadsheet-ruby](https://github.com/gimite/google-spreadsheet-ruby)
- [Medium - Understanding HashMap Data Structure in Ruby](https://medium.com/software-development-with-ease/understanding-hashmap-datastructure-ruby-aec3868bc5ad)


**Note:** If you enjoy my content, please feel free to leave a comment or share 
your thoughts. Your feedback is greatly appreciated and encourages me to continue
 creating valuable content. Thank you for your support! 
{: .notice--success}




