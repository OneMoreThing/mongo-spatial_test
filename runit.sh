#!/bin/bash
mongo localhost:27017/tests2 --quiet config.js data/data_generators.js cases/cases.js runner/runner.js "$1"