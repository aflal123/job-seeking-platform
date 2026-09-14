import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [search, setSearch] = useState('');

  const mockJobs = [
    { id: '1', title: 'Senior Full Stack Engineer', company: 'TechCorp', salary: '$120k - $150k', location: 'Remote' },
    { id: '2', title: 'Mobile App Developer (React Native)', company: 'InnovateX', salary: '$100k - $130k', location: 'San Francisco, CA' },
    { id: '3', title: 'AI Research Scientist', company: 'DeepScale', salary: '$160k - $200k', location: 'Hybrid' },
  ];

  const mockCourses = [
    { id: '1', title: 'Spring Boot 3 & Microservices Mastery', trainer: 'Dr. Sarah Connor', progress: '75%' },
    { id: '2', title: 'Full Stack React & Neon Postgres', trainer: 'Alex Johnson', progress: '40%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Job<Text style={styles.logoAccent}>Pulse</Text></Text>
        <Text style={styles.roleBadge}>JOB SEEKER</Text>
      </View>

      {/* Content Body */}
      <ScrollView style={styles.content}>
        {activeTab === 'jobs' ? (
          <View>
            <Text style={styles.sectionTitle}>Find Your Next Career</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs, skills, companies..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={setSearch}
            />

            {mockJobs.map((job) => (
              <View key={job.id} style={styles.card}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.companyName}>{job.company} • {job.location}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.salaryText}>{job.salary}</Text>
                  <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyBtnText}>1-Click Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>My Learning & Mentorship</Text>
            {mockCourses.map((course) => (
              <View key={course.id} style={styles.card}>
                <Text style={styles.jobTitle}>{course.title}</Text>
                <Text style={styles.companyName}>Trainer: {course.trainer}</Text>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: course.progress }]} />
                </View>
                <Text style={styles.progressText}>Progress: {course.progress}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('jobs')}>
          <Text style={[styles.navText, activeTab === 'jobs' && styles.navActive]}>💼 Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('courses')}>
          <Text style={[styles.navText, activeTab === 'courses' && styles.navActive]}>📚 Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('notifications')}>
          <Text style={[styles.navText, activeTab === 'notifications' && styles.navActive]}>🔔 Alerts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  logoAccent: {
    color: '#6366f1',
  },
  roleBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#a855f7',
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(18, 24, 38, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(18, 24, 38, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  applyBtn: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginVertical: 8,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#06b6d4',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
    backgroundColor: '#090d16',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
  navActive: {
    color: '#ffffff',
  },
});
