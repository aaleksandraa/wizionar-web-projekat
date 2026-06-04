CREATE TABLE IF NOT EXISTS project_inquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  uuid CHAR(36) NOT NULL,
  full_name VARCHAR(190) NOT NULL,
  company_name VARCHAR(190) NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(80) NULL,
  location VARCHAR(190) NULL,
  business_description TEXT NULL,
  project_type VARCHAR(80) NOT NULL,
  budget_range VARCHAR(120) NULL,
  desired_start VARCHAR(120) NULL,
  desired_deadline VARCHAR(20) NULL,
  next_step VARCHAR(190) NULL,
  complexity_score ENUM('low', 'medium', 'high', 'enterprise') NOT NULL DEFAULT 'low',
  budget_score ENUM('low_budget', 'standard', 'serious', 'enterprise', 'unknown') NOT NULL DEFAULT 'unknown',
  status ENUM('new', 'reviewed', 'needs_more_info', 'proposal_sent', 'accepted', 'rejected', 'archived') NOT NULL DEFAULT 'new',
  locale VARCHAR(10) NOT NULL DEFAULT 'sr',
  submitted_date_label VARCHAR(10) NOT NULL,
  raw_payload JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY project_inquiries_uuid_unique (uuid),
  KEY project_inquiries_email_index (email),
  KEY project_inquiries_project_type_index (project_type),
  KEY project_inquiries_status_index (status),
  KEY project_inquiries_created_at_index (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_inquiry_answers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_inquiry_id BIGINT UNSIGNED NOT NULL,
  step_key VARCHAR(120) NULL,
  step_title VARCHAR(255) NULL,
  question_key VARCHAR(120) NOT NULL,
  question_label VARCHAR(255) NOT NULL,
  answer_value JSON NULL,
  answer_label TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY project_inquiry_answers_inquiry_index (project_inquiry_id),
  CONSTRAINT project_inquiry_answers_inquiry_fk
    FOREIGN KEY (project_inquiry_id) REFERENCES project_inquiries(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_inquiry_notes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_inquiry_id BIGINT UNSIGNED NOT NULL,
  admin_user_id BIGINT UNSIGNED NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY project_inquiry_notes_inquiry_index (project_inquiry_id),
  CONSTRAINT project_inquiry_notes_inquiry_fk
    FOREIGN KEY (project_inquiry_id) REFERENCES project_inquiries(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
