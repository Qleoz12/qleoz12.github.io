require "google_drive"

module Reading
  class Generator < Jekyll::Generator
    def generate(site)
      key_path = google_credentials_path(site)

      unless should_fetch_google_drive?(key_path)
        site.data["certs"] ||= {}
        return
      end

      session = GoogleDrive::Session.from_service_account_key(key_path)

      data = {}
      session.files.each do |file|
        next unless file.resource_type == "folder"

        folder_id = file.resource_id[file.resource_id.rindex(":") + 1..]
        childs = session.files(q: "'#{folder_id}' in parents ")

        children = []
        childs.each do |child|
          children.push(
            "human_url" => child.human_url.sub("view", "preview"),
            "title" => child.title
          )
        end
        data[file.title] = children
      end

      site.data["certs"] = data
    end

    private

    def google_credentials_path(site)
      env_path = ENV["GOOGLE_DRIVE_KEY_PATH"]
      return env_path if env_path && !env_path.strip.empty?

      File.join(site.source, "_plugins", "config.json")
    end

    def should_fetch_google_drive?(key_path)
      if ENV["SKIP_GOOGLE_DRIVE"] == "1" || ENV["JEKYLL_SKIP_GOOGLE_DRIVE"] == "1"
        Jekyll.logger.info "Reading:", "Skipping Google Drive (SKIP_GOOGLE_DRIVE=1)."
        return false
      end

      if ENV["JEKYLL_ENV"] == "development"
        Jekyll.logger.info "Reading:", "Skipping Google Drive in development (jekyll serve). Build with JEKYLL_ENV=production and _plugins/config.json to refresh certs data."
        return false
      end

      unless File.file?(key_path)
        Jekyll.logger.warn "Reading:", "Google Drive skipped: no credentials file at #{key_path}. /certs/ will omit Drive embeds until you add the JSON (gitignored)."
        return false
      end

      true
    end
  end
end
