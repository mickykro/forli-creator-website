-- Import businesses from Google Sheets CSV
-- Run this in Supabase SQL Editor after applying migration 008

-- Clear existing test data (optional)
-- DELETE FROM public.businesses;

-- Insert businesses
INSERT INTO public.businesses (
  business_id, business_name, phone_number, status, details,
  business_profile_compact, hours, updated_at, calendly_token,
  calendly_refresh_token, calendly_user_uri, calendly_connected_at,
  calendly_event_type_uri, instagram, pending_state, knowledge_stage,
  validation_started_at, intent, created_at
) VALUES
('C018', 'Fix Fit - הבית של האימונים🏠', '972546239938', 'activate', 'אימוני כושר פרטיים', NULL, NULL, '2025-12-27T23:50:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-27T23:50:00Z'),
('C014', 'מיקי', '972542045180', 'activate', 'אוטומציה לשיחות שלא נענו', NULL, NULL, '2025-12-27T23:18:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-27T23:18:00Z'),
('C021', 'שיווק וייעוץ טכנולוגי', '972557209518', 'activate', 'שירותים טכנולוגים לפרטיים ועסקים', NULL, NULL, '2025-12-28T12:09:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-28T12:09:00Z'),
('C033', 'אור הלל', '972527880033', 'activate', 'דנדו', NULL, NULL, '2026-01-01T17:22:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-01T17:22:00Z'),
('C037', 'סופר ספה', '972559490872', 'activate', 'ניקוי ספות ניקןי מזרונים ניקוי שטיחים ניקוי ריפודי רכב ניקוי כיסאות ניקוי וחיטוי מזגנים', NULL, NULL, '2026-01-02T22:09:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02T22:09:00Z'),
('C040', 'ישראל פתרונות', '972546653586', 'activate', 'אני מספק פתרונות לעסקים קטנים', NULL, NULL, '2026-01-04T15:19:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-04T15:19:00Z'),
('C054', 'InfoTarget - https://www.infotarget.co.il/', '972544969359', 'activate', 'מודיעין תחרותי', NULL, NULL, '2026-01-27T16:56:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-27T16:56:00Z'),
('C056', 'רונן דבי רפואה', '972523456051', 'activate', 'ניתוחים פרטיים', NULL, NULL, '2026-01-30T22:21:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-30T22:21:00Z'),
('C059', 'הדובדבן שבגולן', '972547515166', 'activate', 'אתר קמפינג וקטיף עצמי של דובדנים', NULL, NULL, '2026-02-04T15:34:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-04T15:34:00Z'),
('C061', 'טל מבית הספר להייטק בבר אילן', '972543936352', 'signup', 'שיווק לקורסים בהייטק', NULL, 'ראשון-חמישי 9:00-17:00', '2026-02-06T11:24:00Z', NULL, NULL, NULL, NULL, NULL, 'taleynan', NULL, NULL, NULL, NULL, '2026-02-06T11:24:00Z'),
('C063', 'מיקי מcall4li', '972542045280', 'active', 'בניית אוטומציות לעסקים, עסקים קטנים עד בינוניים', 'בניית אוטומציות לעסקים, עסקים קטנים עד בינוניים', 'ראשון-שני 06:00-16:00, שלישי-חמישי 10:00-19:00, שישי-שבת סגור.', '2026-04-17T13:48:08.562Z', 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzc2NTA1NTg3LCJqdGkiOiIyOWRmMDFlMy01OTE4LTQ1MWEtOWI5NS1kMTllOWZlYWJjYzgiLCJ1c2VyX3V1aWQiOiJlZDA1M2FhZi0wMTQ5LTQwN2UtYjU1OS00ODFhZTFhYjlmZGEiLCJhcHBfdWlkIjoiYzZSVUdGMHJvYjB1V2kyV2NvSGJKMnZoQ2hwcEFrUlFwQkVaQWo1TFZIYyIsInNjb3BlIjoidXNlcnM6cmVhZCBldmVudF90eXBlczpyZWFkIGF2YWlsYWJpbGl0eTpyZWFkIiwiZXhwIjoxNzc2NTEyNzg3fQ.0u3GLx-qw0Vr3h1gn0j1UrLFMByvDUBddBUPBOtmmTqachZRYPmZxTs4HyHwgpAbqIJ519EXCE5gz7mpI6mv5w', 'ETROpNP7f1Ic_aF1LsNQT2bF-x0K0VWVZkVhNtWAM0s', 'https://api.calendly.com/users/ed053aaf-0149-407e-b559-481ae1ab9fda', '2026-04-18T09:46:27.534Z', 'https://api.calendly.com/event_types/35497e92-bce1-4e71-859b-44586e1b0619', NULL, NULL, 'faq_invite', '2026-04-17T13:48:08.562Z', NULL, '2026-04-17T13:48:08.562Z'),
('C065', 'בי טורס', '972547380806', 'activate', 'תיירות', NULL, NULL, '2026-02-17T16:16:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-17T16:16:00Z'),
('C073', 'שביל הזכויות', '972556670408', 'activate', 'עוסק במימוש זכויות רפואיות מול ביטוח לאומי', NULL, NULL, '2026-03-11T15:30:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-11T15:30:00Z'),
('C076', 'ארנקי קפיץ בעמ', '972544666840', 'active', 'אני מוכר ארנקים', NULL, '9:00-18:00', '2026-04-29T17:38:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-04-29T17:38:00Z'),
('C081', 'דינמיק שיפוצים', '972507200601', 'active', 'עבודות בנייה ושיפוצים', NULL, NULL, '2026-05-06T13:21:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-06T13:21:00Z'),
('C064', 'פורלי', '972548018957', 'active', 'מנחת סדנאות', NULL, NULL, '2026-05-07T10:57:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-07T10:57:00Z'),
('C084', 'רי ספייס', '972548136030', 'active', 'שיפוצים מסחריים', NULL, NULL, '2026-05-07T13:31:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-07T13:31:00Z'),
('C086', 'סלון היזמיות', '972586333221', 'active', 'מרחב עבודה פיזי ליזמיות שבו עובדות במשותף בסלון ביתי כל אחת על מיזמים שלה. יש תכנית ליווי פיזית קבוצתית של חודשיים, מפגשי הקאתון של ערב אחד, סדנאות יצירה, הרצאות ועוד', NULL, NULL, '2026-05-13T11:19:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-13T11:19:00Z'),
('C085', 'Dr. Eyal Elad', '972532844408', 'active', 'טיפולי אסתטיקה', NULL, NULL, '2026-05-13T11:32:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-13T11:32:00Z'),
('C088', 'Bamboo Club', '972526989375', 'active', 'פלטפורמה לאירועים בנושאים התפתחות אישית, עסקים, וולנס ומסיבות', NULL, NULL, '2026-05-13T12:08:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-13T12:08:00Z'),
('C089', 'ירדן', '972542244230', 'active', 'לא רלוונטי', NULL, NULL, '2026-05-13T22:27:00Z', NULL, NULL, NULL, NULL, NULL, NULL, 'awaiting_video_prompt', NULL, NULL, NULL, '2026-05-13T22:27:00Z'),
('C091', 'Body Mind Soul Therapy', '972542068669', 'active', 'תחום הוולנס. סדנאות, ריטריטים, ליווי קבוצות וליווי אישי בקליניקה', NULL, NULL, '2026-05-14T11:52:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-14T11:52:00Z'),
('C090', 'בתאלה', '972547191442', 'active', 'פרטי', NULL, NULL, '2026-05-14T12:40:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-14T12:40:00Z'),
('C095', 'אור רובין ולוחמים לניקיון', '972549022090', 'active', 'אחד מאמן כושר השני ניקיון בתים לפני איכלוס אחרי שיפוץ מעבר דירה', NULL, NULL, '2026-05-14T17:57:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-14T17:57:00Z'),
('C097', 'CM digital marketing', '972542885214', 'active', 'סוכנות שיווק שמתמחה בניהול סושיאל ואוטומציות', NULL, NULL, '2026-05-15T19:59:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-15T19:59:00Z'),
('C098', 'Neomi Chen', '972542419316', 'active', 'מוכרת תכשיטים בעבודת יד ומנחה סדנאות כתיבה בעסק כרגע בבנייה', NULL, NULL, '2026-05-17T14:52:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-17T14:52:00Z'),
('C099', 'Invisible Ai', '972528261235', 'active', 'קורס AI', NULL, NULL, '2026-05-18T15:43:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-18T15:43:00Z'),
('C101', 'מירב פלברג צלמת', '972544654500', 'active', 'צילום אדריכלות ועיצוב פנים', NULL, NULL, '2026-05-18T15:45:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-18T15:45:00Z'),
('C104', 'Nexa', '972549393940', 'active', 'מותג בגדים', NULL, NULL, '2026-05-18T15:54:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-18T15:54:00Z'),
('C106', 'חוויות', '972586160399', 'active', 'פעילויות גיבוש', NULL, NULL, '2026-05-18T17:29:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-18T17:29:00Z'),
('C103', 'Amit.Ai', '972544551655', 'active', 'דברים שקשורים לבינה מלאכותית', NULL, NULL, '2026-05-18T22:35:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-18T22:35:00Z'),
('C105', 'ליווי תזונתי מדעי', '972534513786', 'active', 'אני מלווה אנשים לאורח חיים בריא איזון הורמונלי מטבוליזם בעיות במערכת עיכול וחדירות מעי. אני מנהלת חשבון אינסטגרם ורוצה ליצור סרטונים D3 עם הסברים על מנגנונים בגוף', NULL, NULL, '2026-05-19T12:38:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-19T12:38:00Z'),
('C107', 'נבחרת ה-5,000', '972542622048', 'active', 'גיוס המונים לנער עם צרכים מיוחדים', NULL, NULL, '2026-05-19T17:03:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-19T17:03:00Z'),
('C108', 'הפודקסיה', '972546956222', 'active', 'מפיק פודקאסטים', NULL, NULL, '2026-05-21T12:21:00Z', NULL, NULL, NULL, NULL, NULL, NULL, 'awaiting_video_prompt', NULL, NULL, NULL, '2026-05-21T12:21:00Z'),
('C110', 'Asu Clinics', '972543233443', 'active', 'קליניקה רפואית', NULL, NULL, '2026-05-21T13:54:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-21T13:54:00Z'),
('C111', 'ביזרוק', '19174633797', 'active', 'מוכר אבטיחים', NULL, NULL, '2026-05-24T18:09:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-24T18:09:00Z'),
('C112', 'קסמי החיים מתגלים✨', '972526937315', 'active', 'הרצאות, אימונים אישיים, ליווי ליצירת הרצאות השראה, כתיבה ועוד.', NULL, NULL, '2026-05-24T20:40:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-24T20:40:00Z'),
('C113', 'פאוץ''', '972543974014', 'active', 'גיוס משקיעים לעסקאות נדל"ן', NULL, NULL, '2026-05-26T11:16:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-26T11:16:00Z'),
('C115', 'דואקספרט', '972543301310', 'active', 'נדלן', NULL, NULL, '2026-05-26T11:30:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-26T11:30:00Z'),
('C116', 'דורון הנדסה', '972546288433', 'active', 'בניין', NULL, NULL, '2026-05-26T11:53:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-26T11:53:00Z'),
('C120', 'המוסך', '972507631119', 'active', 'מסעדה חלבית ופיצריה', NULL, NULL, '2026-05-26T23:08:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-26T23:08:00Z'),
('C121', 'דיגיי נעם', '972546500676', 'active', 'נותן שירות דיגיי dj', NULL, NULL, '2026-05-27T13:31:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-27T13:31:00Z'),
('C119', 'מאיה דון', '972542281720', 'active', 'בגדול אני מקימה משהו חדש זה להיוצ משפיענית תוכן אין כרגע תחום ספציפי', NULL, NULL, '2026-05-27T19:47:00Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-27T19:47:00Z')
ON CONFLICT (business_id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  phone_number = EXCLUDED.phone_number,
  status = EXCLUDED.status,
  details = EXCLUDED.details,
  updated_at = EXCLUDED.updated_at;

-- Verify import
SELECT COUNT(*) as total_businesses,
       COUNT(DISTINCT status) as distinct_statuses,
       COUNT(CASE WHEN calendly_token IS NOT NULL THEN 1 END) as with_calendly
FROM public.businesses;

-- Show sample data
SELECT business_id, business_name, status, phone_number, created_at
FROM public.businesses
ORDER BY created_at DESC
LIMIT 10;
