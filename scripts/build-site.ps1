$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot

Write-Host "==> Jekyll build..."
Push-Location "$Root\jekyll"
bundle exec jekyll build
Pop-Location

Write-Host "==> Astro portfolio build..."
Push-Location "$Root\portfolio"
npm run build
Pop-Location

$css = Get-ChildItem "$Root\docs\portfolio\_astro\*.css" -ErrorAction SilentlyContinue
if (-not $css) {
  Write-Error "Missing docs/portfolio/_astro/*.css"
}
if (-not (Test-Path "$Root\docs\.nojekyll")) {
  New-Item -ItemType File -Path "$Root\docs\.nojekyll" -Force | Out-Null
}
Write-Host "==> OK. CSS: $($css.Name)"

