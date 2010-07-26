#!/bin/sh

lang="en"
stylesheet="simplified"
filename="eugene.janusov.resume"
fileext="html"

xsltproc --html -o "${filename}.${fileext}" "cv2${stylesheet}.xsl" "cv.${lang}.html"

