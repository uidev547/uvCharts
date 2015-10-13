#!/bin/bash
if [ $# -eq 0 ]; then
  echo "Directory to clone into not specified."
  echo "Usage: ./clone_projects.sh ~/projects/d3"
fi

CLONE_DIR=$1
D3_PROJECTS="d3-plugins d3-format d3-time-format d3-hierarchy d3-color d3-bundler d3-selection d3-arrays d3-ease d3-scale d3-time d3-polygon d3-shape d3-path d3-voronoi d3-hull d3-quadtree d3-dispatch d3-dsv d3-interpolate d3-random d3-selection-multi d3-timer d3-transition d3-xhr d3-geo-projection"

cd $CLONE_DIR
for project in $D3_PROJECTS; do
  git clone https://www.github.com/d3/$project
done
cd -