#!/bin/sh

psql -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" --username "$POSTGRES_USER" <<EOF
CREATE extension IF NOT EXISTS "uuid-ossp";
SELECT * FROM pg_extension;
EOF