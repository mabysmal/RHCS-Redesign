// src/utils/eventUtils.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DateTime } from 'luxon';

export interface Event {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  description?: string;
  timezone: string;
  slug: string;
}

export interface ParsedEvent extends Event {
  startDate: DateTime;
  endDate: DateTime;
  formattedStartDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function getAllEvents(): ParsedEvent[] {
  const eventsDirectory = path.join(process.cwd(), 'src/content/events');
  
  // Check if directory exists
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(eventsDirectory);
  const events = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(eventsDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        ...data,
        slug: name.replace(/\.md$/, ''),
      } as Event;
    })
    .map(parseEvent)
    .filter(event => event !== null) as ParsedEvent[];

  return events;
}

function parseEvent(event: Event): ParsedEvent | null {
  try {
    // Parse the datetime strings from Decap CMS format
    const startDate = DateTime.fromFormat(
      event.startDateTime, 
      'yyyy-MM-dd hh:mm a [America/Vancouver]',
      { zone: 'America/Vancouver' }
    );
    
    const endDate = DateTime.fromFormat(
      event.endDateTime, 
      'yyyy-MM-dd hh:mm a [America/Vancouver]',
      { zone: 'America/Vancouver' }
    );

    if (!startDate.isValid || !endDate.isValid) {
      console.error('Invalid date format for event:', event.title);
      return null;
    }

    return {
      ...event,
      startDate,
      endDate,
      formattedStartDate: startDate.toFormat('yyyy-MM-dd'),
      formattedStartTime: startDate.toFormat('h:mm a'),
      formattedEndTime: endDate.toFormat('h:mm a'),
      dayOfMonth: startDate.toFormat('d'),
      month: startDate.toFormat('MMM').toUpperCase(),
      dayOfWeek: startDate.toFormat('cccc'),
    };
  } catch (error) {
    console.error('Error parsing event:', event.title, error);
    return null;
  }
}

export function getUpcomingEvents(): ParsedEvent[] {
  const allEvents = getAllEvents();
  const now = DateTime.now().setZone('America/Vancouver');
  
  return allEvents
    .filter(event => event.startDate > now)
    .sort((a, b) => a.startDate.toMillis() - b.startDate.toMillis());
}

export function getNextEvent(): ParsedEvent | null {
  const upcomingEvents = getUpcomingEvents();
  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
}

export function getOtherUpcomingEvents(): ParsedEvent[] {
  const upcomingEvents = getUpcomingEvents();
  return upcomingEvents.slice(1);
}