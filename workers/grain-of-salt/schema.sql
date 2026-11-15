-- Cloudflare D1 Schema for Project Directive: The Grain of Salt
-- Stores sanitized bug/complaint reports, content fingerprints, and durable rate-limit / budget counters.

CREATE TABLE IF NOT EXISTS reports (
    report_id TEXT PRIMARY KEY,
    fingerprint TEXT NOT NULL UNIQUE,
    report_type TEXT NOT NULL DEFAULT 'bug_report',
    status TEXT NOT NULL DEFAULT 'accepted',
    classification TEXT NOT NULL DEFAULT 'pending',
    affected_section TEXT NOT NULL DEFAULT '',
    reproducibility TEXT NOT NULL DEFAULT 'unsure',
    description TEXT NOT NULL,
    steps TEXT NOT NULL DEFAULT '',
    expected_behavior TEXT NOT NULL DEFAULT '',
    reply_email TEXT NOT NULL DEFAULT '',
    diagnostics_json TEXT NOT NULL DEFAULT '{}',
    triage_json TEXT NOT NULL DEFAULT '{}',
    duplicate_count INTEGER NOT NULL DEFAULT 1,
    source_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reports_fingerprint ON reports(fingerprint);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);

CREATE TABLE IF NOT EXISTS rate_limits (
    bucket_key TEXT PRIMARY KEY,
    counter INTEGER NOT NULL DEFAULT 0,
    window_start INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at ON rate_limits(expires_at);
