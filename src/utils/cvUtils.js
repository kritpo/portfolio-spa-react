import * as BASICS from '../containers/CV/BasicsContainer';
import * as WORK from '../containers/CV/WorkContainer';
import * as VOLUNTEER from '../containers/CV/VolunteerContainer';
import * as EDUCATION from '../containers/CV/EducationContainer';
import * as PROJECTS from '../containers/CV/ProjectsContainer';
import * as SKILLS from '../containers/CV/SkillsContainer';
import * as LANGUAGES from '../containers/CV/LanguagesContainer';
import * as INTERESTS from '../containers/CV/InterestsContainer';
import * as REFERENCES from '../containers/CV/ReferencesContainer';

/**
 * convert basics form to an object
 * @param {object} form the basics form
 * @returns the final object
 */
export const mapBasicsFormToObject = form => ({
	name: form[BASICS.NAME].value,
	label: form[BASICS.LABEL].value,
	picture: form[BASICS.PICTURE].value,
	email: form[BASICS.EMAIL].value,
	phone: form[BASICS.PHONE].value,
	website: form[BASICS.WEBSITE].value,
	summary: form[BASICS.SUMMARY].value,
	location: {
		address: form[BASICS.ADDRESS].value,
		postalCode: form[BASICS.POSTAL_CODE].value,
		city: form[BASICS.CITY].value,
		countryCode: form[BASICS.COUNTRY_CODE].value,
		region: form[BASICS.REGION].value
	},
	profiles: form[BASICS.PROFILES].map(profilesSubform => ({
		network: profilesSubform[BASICS.NETWORK].value,
		username: profilesSubform[BASICS.USERNAME].value,
		url: profilesSubform[BASICS.URL].value
	}))
});

/**
 * convert work form to an object
 * @param {object} form the work form
 * @returns the final object
 */
export const mapWorkFormToObject = form =>
	form[WORK.WORK].map(workSubform => ({
		isInternship: workSubform[WORK.IS_INTERNSHIP].value,
		company: workSubform[WORK.COMPANY].value,
		position: workSubform[WORK.POSITION].value,
		website: workSubform[WORK.WEBSITE].value,
		startDate: workSubform[WORK.START_DATE].value
			.toISOString()
			.split('T')[0],
		endDate:
			workSubform[WORK.END_DATE].value <= new Date()
				? workSubform[WORK.END_DATE].value.toISOString().split('T')[0]
				: undefined,
		summary: workSubform[WORK.SUMMARY].value,
		highlights: workSubform[WORK.HIGHLIGHTS].map(
			highlightsSubform => highlightsSubform[WORK.HIGHLIGHT].value
		)
	}));

/**
 * convert volunteer form to an object
 * @param {object} form the volunteer form
 * @returns the final object
 */
export const mapVolunteerFormToObject = form =>
	form[VOLUNTEER.VOLUNTEER].map(volunteerSubform => ({
		organization: volunteerSubform[VOLUNTEER.ORGANIZATION].value,
		position: volunteerSubform[VOLUNTEER.POSITION].value,
		website: volunteerSubform[VOLUNTEER.WEBSITE].value,
		startDate: volunteerSubform[VOLUNTEER.START_DATE].value
			.toISOString()
			.split('T')[0],
		endDate:
			volunteerSubform[VOLUNTEER.END_DATE].value <= new Date()
				? volunteerSubform[VOLUNTEER.END_DATE].value
						.toISOString()
						.split('T')[0]
				: undefined,
		summary: volunteerSubform[VOLUNTEER.SUMMARY].value,
		highlights: volunteerSubform[VOLUNTEER.HIGHLIGHTS].map(
			highlightsSubform => highlightsSubform[VOLUNTEER.HIGHLIGHT].value
		)
	}));

/**
 * convert education form to an object
 * @param {object} form the education form
 * @returns the final object
 */
export const mapEducationFormToObject = form =>
	form[EDUCATION.EDUCATION].map(educationSubform => ({
		institution: educationSubform[EDUCATION.INSTITUTION].value,
		area: educationSubform[EDUCATION.AREA].value,
		studyType: educationSubform[EDUCATION.STUDY_TYPE].value,
		startDate: educationSubform[EDUCATION.START_DATE].value
			.toISOString()
			.split('T')[0],
		endDate:
			educationSubform[EDUCATION.END_DATE].value <= new Date()
				? educationSubform[EDUCATION.END_DATE].value
						.toISOString()
						.split('T')[0]
				: undefined,
		gpa: educationSubform[EDUCATION.GPA].value,
		courses: educationSubform[EDUCATION.COURSES].map(coursesSubform => ({
			category: coursesSubform[EDUCATION.CATEGORY].value,
			courses: coursesSubform[EDUCATION.COURSES_COURSES].map(
				coursesCoursesSubform =>
					coursesCoursesSubform[EDUCATION.COURSE].value
			)
		}))
	}));

/**
 * convert projects form to an object
 * @param {object} form the projects form
 * @returns the final object
 */
export const mapProjectsFormToObject = form =>
	form[PROJECTS.PROJECTS].map(projectsSubform => ({
		name: projectsSubform[PROJECTS.NAME].value,
		summary: projectsSubform[PROJECTS.SUMMARY].value,
		startDate: projectsSubform[PROJECTS.START_DATE].value
			.toISOString()
			.split('T')[0],
		endDate:
			projectsSubform[PROJECTS.END_DATE].value <= new Date()
				? projectsSubform[PROJECTS.END_DATE].value
						.toISOString()
						.split('T')[0]
				: undefined,
		picture: projectsSubform[PROJECTS.PICTURE].value,
		url: projectsSubform[PROJECTS.URL].value,
		technologies: projectsSubform[PROJECTS.TECHNOLOGIES].map(
			technologiesSubform =>
				technologiesSubform[PROJECTS.TECHNOLOGY].value
		)
	}));

/**
 * convert skills form to an object
 * @param {object} form the skills form
 * @returns the final object
 */
export const mapSkillsFormToObject = form =>
	form[SKILLS.SKILLS].map(skillsSubform => ({
		name: skillsSubform[SKILLS.NAME].value,
		level: skillsSubform[SKILLS.LEVEL].value
	}));

/**
 * convert languages form to an object
 * @param {object} form the languages form
 * @returns the final object
 */
export const mapLanguagesFormToObject = form =>
	form[LANGUAGES.LANGUAGES].map(languagesSubform => ({
		countryCode: languagesSubform[LANGUAGES.COUNTRY_CODE].value,
		language: languagesSubform[LANGUAGES.LANGUAGE].value,
		fluency: languagesSubform[LANGUAGES.FLUENCY].value
	}));

/**
 * convert interests form to an object
 * @param {object} form the interests form
 * @returns the final object
 */
export const mapInterestsFormToObject = form =>
	form[INTERESTS.INTERESTS].map(interestsSubform => ({
		name: interestsSubform[INTERESTS.NAME].value,
		keywords: interestsSubform[INTERESTS.KEYWORDS].map(
			keywordsSubform => keywordsSubform[INTERESTS.KEYWORD].value
		)
	}));

/**
 * convert references form to an object
 * @param {object} form the references form
 * @returns the final object
 */
export const mapReferencesFormToObject = form =>
	form[REFERENCES.REFERENCES].map(referencesSubform => ({
		name: referencesSubform[REFERENCES.NAME].value,
		reference: referencesSubform[REFERENCES.REFERENCE].value
	}));
