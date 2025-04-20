-- Seed script to populate Kanban board data from data.json
-- Run in Supabase SQL Editor
-- All boards are owned by user with id: '23735d52-b567-42a4-8030-593053922621'

-- Insert Boards
INSERT INTO boards (id, name, user_id, work_schedule, created_at, updated_at)
VALUES
    -- Platform Launch
    ('a1b2c3d4-e5f6-7890-abcd-123456789001', 'Platform Launch', '23735d52-b567-42a4-8030-593053922621',
     '{"monday": 8, "tuesday": 8, "wednesday": 8, "thursday": 8, "friday": 8, "saturday": 4, "sunday": 4}',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Marketing Plan
    ('a1b2c3d4-e5f6-7890-abcd-123456789002', 'Marketing Plan', '23735d52-b567-42a4-8030-593053922621',
     '{"monday": 8, "tuesday": 8, "wednesday": 8, "thursday": 8, "friday": 8, "saturday": 4, "sunday": 4}',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Roadmap
    ('a1b2c3d4-e5f6-7890-abcd-123456789003', 'Roadmap', '23735d52-b567-42a4-8030-593053922621',
     '{"monday": 8, "tuesday": 8, "wednesday": 8, "thursday": 8, "friday": 8, "saturday": 4, "sunday": 4}',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Columns for Platform Launch (board_id: a1b2c3d4-e5f6-7890-abcd-123456789001)
INSERT INTO columns (id, name, board_id, created_at, updated_at)
VALUES ('b1c2d3e4-f5g6-7890-abcd-123456789101', 'Todo', 'a1b2c3d4-e5f6-7890-abcd-123456789001', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('b1c2d3e4-f5g6-7890-abcd-123456789102', 'Doing', 'a1b2c3d4-e5f6-7890-abcd-123456789001', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('b1c2d3e4-f5g6-7890-abcd-123456789103', 'Done', 'a1b2c3d4-e5f6-7890-abcd-123456789001', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);

-- Insert Columns for Marketing Plan (board_id: a1b2c3d4-e5f6-7890-abcd-123456789002)
INSERT INTO columns (id, name, board_id, created_at, updated_at)
VALUES ('b1c2d3e4-f5g6-7890-abcd-123456789201', 'Todo', 'a1b2c3d4-e5f6-7890-abcd-123456789002', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('b1c2d3e4-f5g6-7890-abcd-123456789202', 'Doing', 'a1b2c3d4-e5f6-7890-abcd-123456789002', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('b1c2d3e4-f5g6-7890-abcd-123456789203', 'Done', 'a1b2c3d4-e5f6-7890-abcd-123456789002', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);

-- Insert Columns for Roadmap (board_id: a1b2c3d4-e5f6-7890-abcd-123456789003)
INSERT INTO columns (id, name, board_id, created_at, updated_at)
VALUES ('b1c2d3e4-f5g6-7890-abcd-123456789301', 'Now', 'a1b2c3d4-e5f6-7890-abcd-123456789003', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('b1c2d3e4-f5g6-7890-abcd-123456789302', 'Next', 'a1b2c3d4-e5f6-7890-abcd-123456789003', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('b1c2d3e4-f5g6-7890-abcd-123456789303', 'Later', 'a1b2c3d4-e5f6-7890-abcd-123456789003', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);

-- Insert Tasks and Subtasks for Platform Launch
INSERT INTO tasks (id, title, description, status, column_id, estimated_hours, created_at, updated_at)
VALUES ('c1d2e3f4-g5h6-7890-abcd-123456789401', 'Build UI for onboarding flow', '', 'Todo',
        'b1c2d3e4-f5g6-7890-abcd-123456789101', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789402', 'Build UI for search', '', 'Todo',
        'b1c2d3e4-f5g6-7890-abcd-123456789101', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789403', 'Build settings UI', '', 'Todo', 'b1c2d3e4-f5g6-7890-abcd-123456789101',
        2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789404', 'QA and test all major user journeys',
        'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
        'Todo', 'b1c2d3e4-f5g6-7890-abcd-123456789101', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO subtasks (id, title, is_completed, task_id, created_at, updated_at)
VALUES
    -- Subtasks for Build UI for onboarding flow
    ('d1e2f3g4-h5i6-7890-abcd-123456789501', 'Sign up page', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789401',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789502', 'Sign in page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789401',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789503', 'Welcome page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789401',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Build UI for search
    ('d1e2f3g4-h5i6-7890-abcd-123456789504', 'Search page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789402',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Build settings UI
    ('d1e2f3g4-h5i6-7890-abcd-123456789505', 'Account page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789403',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789506', 'Billing page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789403',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for QA and test
    ('d1e2f3g4-h5i6-7890-abcd-123456789507', 'Internal testing', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789404',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789508', 'External testing', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789404',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Tasks and Subtasks for Platform Launch - Doing Column
INSERT INTO tasks (id, title, description, status, column_id, estimated_hours, created_at, updated_at)
VALUES ('c1d2e3f4-g5h6-7890-abcd-123456789405', 'Design settings and search pages', '', 'Doing',
        'b1c2d3e4-f5g6-7890-abcd-123456789102', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789406', 'Add account management endpoints', '', 'Doing',
        'b1c2d3e4-f5g6-7890-abcd-123456789102', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789407', 'Design onboarding flow', '', 'Doing',
        'b1c2d3e4-f5g6-7890-abcd-123456789102', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789408', 'Add search endpoints', '', 'Doing',
        'b1c2d3e4-f5g6-7890-abcd-123456789102', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789409', 'Add authentication endpoints', '', 'Doing',
        'b1c2d3e4-f5g6-7890-abcd-123456789102', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789410',
        'Research pricing points of various competitors and trial different business models',
        'We know what we''re planning to build for version one. Now we need to finalise the first pricing model we''ll use. Keep iterating the subtasks until we have a coherent proposition.',
        'Doing', 'b1c2d3e4-f5g6-7890-abcd-123456789102', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO subtasks (id, title, is_completed, task_id, created_at, updated_at)
VALUES
    -- Subtasks for Design settings and search pages
    ('d1e2f3g4-h5i6-7890-abcd-123456789509', 'Settings - Account page', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789405',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789510', 'Settings - Billing page', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789405',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789511', 'Search page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789405',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Add account management endpoints
    ('d1e2f3g4-h5i6-7890-abcd-123456789512', 'Upgrade plan', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789406',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789513', 'Cancel plan', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789406',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789514', 'Update payment method', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789406',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Design onboarding flow
    ('d1e2f3g4-h5i6-7890-abcd-123456789515', 'Sign up page', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789407',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789516', 'Sign in page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789407',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789517', 'Welcome page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789407',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Add search endpoints
    ('d1e2f3g4-h5i6-7890-abcd-123456789518', 'Add search endpoint', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789408',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789519', 'Define search filters', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789408',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Add authentication endpoints
    ('d1e2f3g4-h5i6-7890-abcd-123456789520', 'Define user model', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789409',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789521', 'Add auth endpoints', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789409',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Research pricing points
    ('d1e2f3g4-h5i6-7890-abcd-123456789522', 'Research competitor pricing and business models', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789410', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789523', 'Outline a business model that works for our solution', FALSE,
     'c1d2e3f4-g5h6-7890-abcd-123456789410', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789524',
     'Talk to potential customers about our proposed solution and ask for fair price expectancy', FALSE,
     'c1d2e3f4-g5h6-7890-abcd-123456789410', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Tasks and Subtasks for Platform Launch - Done Column
INSERT INTO tasks (id, title, description, status, column_id, estimated_hours, created_at, updated_at)
VALUES ('c1d2e3f4-g5h6-7890-abcd-123456789411', 'Conduct 5 wireframe tests',
        'Ensure the layout continues to make sense and we have strong buy-in from potential users.', 'Done',
        'b1c2d3e4-f5g6-7890-abcd-123456789103', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789412', 'Create wireframe prototype',
        'Create a greyscale clickable wireframe prototype to test our assumptions so far.', 'Done',
        'b1c2d3e4-f5g6-7890-abcd-123456789103', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789413', 'Review results of usability tests and iterate',
        'Keep iterating through the subtasks until we''re clear on the core concepts for the app.', 'Done',
        'b1c2d3e4-f5g6-7890-abcd-123456789103', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789414',
        'Create paper prototypes and conduct 10 usability tests with potential customers', '', 'Done',
        'b1c2d3e4-f5g6-7890-abcd-123456789103', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789415', 'Market discovery',
        'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
        'Done', 'b1c2d3e4-f5g6-7890-abcd-123456789103', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789416', 'Competitor analysis', '', 'Done',
        'b1c2d3e4-f5g6-7890-abcd-123456789103', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789417', 'Research the market',
        'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
        'Done', 'b1c2d3e4-f5g6-7890-abcd-123456789103', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO subtasks (id, title, is_completed, task_id, created_at, updated_at)
VALUES
    -- Subtasks for Conduct 5 wireframe tests
    ('d1e2f3g4-h5i6-7890-abcd-123456789525', 'Complete 5 wireframe prototype tests', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789411', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Create wireframe prototype
    ('d1e2f3g4-h5i6-7890-abcd-123456789526', 'Create clickable wireframe prototype in Balsamiq', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789412', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Review results of usability tests
    ('d1e2f3g4-h5i6-7890-abcd-123456789527', 'Meet to review notes from previous tests and plan changes', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789413', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789528', 'Make changes to paper prototypes', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789413', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789529', 'Conduct 5 usability tests', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789413',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Create paper prototypes
    ('d1e2f3g4-h5i6-7890-abcd-123456789530', 'Create paper prototypes for version one', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789414', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789531', 'Complete 10 usability tests', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789414', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Market discovery
    ('d1e2f3g4-h5i6-7890-abcd-123456789532', 'Interview 10 prospective customers', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789415', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Competitor analysis
    ('d1e2f3g4-h5i6-7890-abcd-123456789533', 'Find direct and indirect competitors', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789416', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789534', 'SWOT analysis for each competitor', TRUE,
     'c1d2e3f4-g5h6-7890-abcd-123456789416', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Research the market
    ('d1e2f3g4-h5i6-7890-abcd-123456789535', 'Write up research analysis', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789417',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789536', 'Calculate TAM', TRUE, 'c1d2e3f4-g5h6-7890-abcd-123456789417',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Tasks and Subtasks for Marketing Plan
INSERT INTO tasks (id, title, description, status, column_id, estimated_hours, created_at, updated_at)
VALUES ('c1d2e3f4-g5h6-7890-abcd-123456789418', 'Plan Product Hunt launch', '', 'Todo',
        'b1c2d3e4-f5g6-7890-abcd-123456789201', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789419', 'Share on Show HN', '', 'Todo', 'b1c2d3e4-f5g6-7890-abcd-123456789201',
        2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789420', 'Write launch article to publish on multiple channels', '', 'Todo',
        'b1c2d3e4-f5g6-7890-abcd-123456789201', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO subtasks (id, title, is_completed, task_id, created_at, updated_at)
VALUES
    -- Subtasks for Plan Product Hunt launch
    ('d1e2f3g4-h5i6-7890-abcd-123456789537', 'Find hunter', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789418',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789538', 'Gather assets', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789418',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789539', 'Draft product page', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789418',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789540', 'Notify customers', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789418',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789541', 'Notify network', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789418',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789542', 'Launch!', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789418',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Share on Show HN
    ('d1e2f3g4-h5i6-7890-abcd-123456789543', 'Draft out HN post', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789419',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789544', 'Get feedback and refine', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789419',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789545', 'Publish post', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789419',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Write launch article
    ('d1e2f3g4-h5i6-7890-abcd-123456789546', 'Write article', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789420',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789547', 'Publish on LinkedIn', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789420',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789548', 'Publish on Indie Hackers', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789420',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789549', 'Publish on Medium', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789420',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Tasks and Subtasks for Roadmap - Now Column
INSERT INTO tasks (id, title, description, status, column_id, estimated_hours, created_at, updated_at)
VALUES ('c1d2e3f4-g5h6-7890-abcd-123456789421', 'Launch version one', '', 'Now', 'b1c2d3e4-f5g6-7890-abcd-123456789301',
        5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('c1d2e3f4-g5h6-7890-abcd-123456789422', 'Review early feedback and plan next steps for roadmap',
        'Beyond the initial launch, we''re keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.',
        'Now', 'b1c2d3e4-f5g6-7890-abcd-123456789301', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO subtasks (id, title, is_completed, task_id, created_at, updated_at)
VALUES
    -- Subtasks for Launch version one
    ('d1e2f3g4-h5i6-7890-abcd-123456789550', 'Launch privately to our waitlist', FALSE,
     'c1d2e3f4-g5h6-7890-abcd-123456789421', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789551', 'Launch publicly on PH, HN, etc.', FALSE,
     'c1d2e3f4-g5h6-7890-abcd-123456789421', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Subtasks for Review early feedback
    ('d1e2f3g4-h5i6-7890-abcd-123456789552', 'Interview 10 customers', FALSE, 'c1d2e3f4-g5h6-7890-abcd-123456789422',
     CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789553', 'Review common customer pain points and suggestions', FALSE,
     'c1d2e3f4-g5h6-7890-abcd-123456789422', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('d1e2f3g4-h5i6-7890-abcd-123456789554', 'Outline next steps for our roadmap', FALSE,
     'c1d2e3f4-g5h6-7890-abcd-123456789422', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);