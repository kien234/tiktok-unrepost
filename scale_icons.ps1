Add-Type -AssemblyName System.Drawing
$sourcePath = "d:\delete repost\icon.png"
if (-Not (Test-Path $sourcePath)) {
    Write-Error "Source icon.png not found!"
    exit
}

$image = [System.Drawing.Image]::FromFile($sourcePath)
$sizes = @(16, 48, 128)

foreach ($size in $sizes) {
    $newImage = new-object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($newImage)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $graphics.DrawImage($image, 0, 0, $size, $size)
    
    $outputPath = "d:\delete repost\icon$size.png"
    $newImage.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $graphics.Dispose()
    $newImage.Dispose()
    Write-Host "Successfully created: icon$size.png ($size x $size)"
}

$image.Dispose()
Write-Host "All icons scaled successfully!"
