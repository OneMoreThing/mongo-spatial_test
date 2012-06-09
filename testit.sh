#!/bin/bash

prefix="${1%.js}"

mongo localhost:27017/tests --quiet config.js "$1" "$prefix"_test.js