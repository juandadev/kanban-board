-- Create enum types for roles and invitation status
CREATE TYPE member_role AS ENUM ('read_only', 'edit', 'admin');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired');

-- Users table to store user information for authentication
CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       email VARCHAR(255) UNIQUE NOT NULL,
                       name VARCHAR(255),
                       password_hash VARCHAR(255),
                       provider VARCHAR(50),
                       provider_id VARCHAR(255),
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Boards table with work_schedule for customizable work hours
CREATE TABLE boards (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(255) NOT NULL,
                        user_id UUID NOT NULL,
                        work_schedule JSONB, -- e.g., {"monday": 2, "tuesday": 2, ..., "saturday": 4, "sunday": 4}
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                        CONSTRAINT valid_work_schedule CHECK (
                            work_schedule IS NULL OR (
                                jsonb_typeof(work_schedule) = 'object' AND
                                work_schedule ? 'monday' AND work_schedule ? 'tuesday' AND
            work_schedule ? 'wednesday' AND work_schedule ? 'thursday' AND
            work_schedule ? 'friday' AND work_schedule ? 'saturday' AND
            work_schedule ? 'sunday' AND
            (work_schedule ->> 'monday')::NUMERIC >= 0 AND
            (work_schedule ->> 'tuesday')::NUMERIC >= 0 AND
            (work_schedule ->> 'wednesday')::NUMERIC >= 0 AND
            (work_schedule ->> 'thursday')::NUMERIC >= 0 AND
            (work_schedule ->> 'friday')::NUMERIC >= 0 AND
            (work_schedule ->> 'saturday')::NUMERIC >= 0 AND
            (work_schedule ->> 'sunday')::NUMERIC >= 0
                                )
                            )
);

-- Columns table to store columns within boards
CREATE TABLE columns (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         name VARCHAR(255) NOT NULL,
                         board_id UUID NOT NULL,
                         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

-- Tasks table with estimated_hours for duration
CREATE TABLE tasks (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       status VARCHAR(50),
                       column_id UUID NOT NULL,
                       estimated_hours NUMERIC CHECK (estimated_hours >= 0),
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE
);

-- Subtasks table to store subtasks within tasks
CREATE TABLE subtasks (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          title VARCHAR(255) NOT NULL,
                          is_completed BOOLEAN NOT NULL DEFAULT FALSE,
                          task_id UUID NOT NULL,
                          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Board_Members table to store board collaborators and their roles
CREATE TABLE board_members (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               board_id UUID NOT NULL,
                               user_id UUID NOT NULL,
                               role member_role NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
                               FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                               UNIQUE (board_id, user_id)
);

-- Invitations table to manage board sharing
CREATE TABLE invitations (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             board_id UUID NOT NULL,
                             inviter_id UUID NOT NULL,
                             email VARCHAR(255) NOT NULL,
                             token VARCHAR(255) UNIQUE NOT NULL,
                             status invitation_status NOT NULL DEFAULT 'pending',
                             role member_role NOT NULL,
                             expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
                             FOREIGN KEY (inviter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_boards_user_id ON boards(user_id);
CREATE INDEX idx_columns_board_id ON columns(board_id);
CREATE INDEX idx_tasks_column_id ON tasks(column_id);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);
CREATE INDEX idx_board_members_board_id ON board_members(board_id);
CREATE INDEX idx_board_members_user_id ON board_members(user_id);
CREATE INDEX idx_invitations_board_id ON invitations(board_id);
CREATE INDEX idx_invitations_inviter_id ON invitations(inviter_id);
CREATE INDEX idx_invitations_token ON invitations(token);

-- Trigger function to update `updated_at` timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for all tables
CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_boards_timestamp
    BEFORE UPDATE ON boards
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_columns_timestamp
    BEFORE UPDATE ON columns
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_tasks_timestamp
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_subtasks_timestamp
    BEFORE UPDATE ON subtasks
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_board_members_timestamp
    BEFORE UPDATE ON board_members
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_invitations_timestamp
    BEFORE UPDATE ON invitations
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();