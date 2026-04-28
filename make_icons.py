from PIL import Image, ImageDraw
import math

def draw_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = size / 128

    # Black rounded background
    r = int(28 * s)
    d.rounded_rectangle([0, 0, size-1, size-1], radius=r, fill=(1, 1, 1, 255))

    # Draw cyan arc (top arrow going right)
    # Arc from roughly 200deg to 320deg
    sw = max(1, int(10 * s))
    cx, cy = int(60*s), int(58*s)
    rad = int(24*s)
    d.arc([cx-rad, cy-rad, cx+rad, cy+rad], start=160, end=310, fill=(37, 244, 238), width=sw)

    # Cyan arrowhead at end of arc
    px, py_ = int(80*s), int(46*s)
    pts = [(int(80*s), int(34*s)), (int(94*s), int(46*s)), (int(80*s), int(58*s))]
    d.polygon(pts, fill=(37, 244, 238))

    # Draw red arc
    cx2, cy2 = int(68*s), int(70*s)
    d.arc([cx2-rad, cy2-rad, cx2+rad, cy2+rad], start=340, end=130, fill=(254, 44, 85), width=sw)

    # Red arrowhead
    pts2 = [(int(48*s), int(94*s)), (int(34*s), int(82*s)), (int(48*s), int(70*s))]
    d.polygon(pts2, fill=(254, 44, 85))

    # White X
    xw = max(1, int(14 * s))
    d.line([(int(36*s), int(36*s)), (int(92*s), int(92*s))], fill=(255, 255, 255), width=xw)
    d.line([(int(92*s), int(36*s)), (int(36*s), int(92*s))], fill=(255, 255, 255), width=xw)

    return img

for size in [16, 48, 128]:
    img = draw_icon(size)
    img.save(f"icon{size}.png", "PNG")
    print(f"Saved icon{size}.png")
