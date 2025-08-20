// App.js - Main Application Component
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Supabase configuration
const supabaseUrl = 'https://srrgioaefwfbynlbnphc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycmdpb2FlZndmYnlubGJucGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2Mzg2NzgsImV4cCI6MjA3MTIxNDY3OH0.7EGDcdqeXr7RoJkm1Gkfo-otxJjq3mxp-5OL71e10JE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Components
const Header = ({ user, onLogout }) => (
  <div className="header">
    <div className="header-left">
      <div className="university-logo">RU</div>
      <span className="header-title">Research University Portal</span>
    </div>
    <div className="header-right">
      {user ? (
        <>
          <span className="user-name">{user.email}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </>
      ) : (
        <button className="login-btn">Log In</button>
      )}
    </div>
  </div>
);

const Sidebar = ({ activeTab, setActiveTab, userType }) => {
  const studentNavItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'opportunities', icon: '📋', label: 'Opportunities' },
    { id: 'applications', icon: '📄', label: 'My Applications' },
    { id: 'profile', icon: '👤', label: 'My Profile' }
  ];

  const facultyNavItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'opportunities', icon: '📋', label: 'My Opportunities' },
    { id: 'applications', icon: '📄', label: 'Applications Received' },
    { id: 'profile', icon: '👤', label: 'Faculty Profile' }
  ];

  const navItems = userType === 'faculty' ? facultyNavItems : studentNavItems;

  return (
    <nav className="sidebar">
      {navItems.map(item => (
        <a
          key={item.id}
          href="#"
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(item.id);
          }}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
};

const StudentDashboard = ({ student, opportunities, applications }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (student && opportunities.length > 0) {
      const calculatedMatches = calculateMatches(student, opportunities);
      setMatches(calculatedMatches);
    }
  }, [student, opportunities]);

  const calculateMatches = (student, opportunities) => {
    return opportunities.map(opp => {
      let score = 0;
      
      // Department compatibility (40% weight)
      if (isDepartmentCompatible(student.major, opp.department)) {
        score += 40;
      }
      
      // Skills overlap (35% weight)
      const skillOverlap = calculateSkillOverlap(student.skills || [], opp.required_skills || []);
      score += skillOverlap * 35;
      
      // Interest similarity (25% weight)
      const interestMatch = calculateTextSimilarity(student.interests || '', opp.description || '');
      score += interestMatch * 25;
      
      return { ...opp, matchScore: Math.round(score) };
    })
    .filter(match => match.matchScore > 30)
    .sort((a, b) => b.matchScore - a.matchScore);
  };

  const isDepartmentCompatible = (studentMajor, oppDepartment) => {
    const compatibilityMatrix = {
      'Computer Science': ['Computer Science', 'Engineering', 'Mathematics'],
      'Engineering': ['Engineering', 'Computer Science', 'Physics'],
      'Biology': ['Biology', 'Chemistry', 'Environmental Science'],
      'Psychology': ['Psychology', 'Neuroscience', 'Behavioral Science']
    };
    
    return compatibilityMatrix[studentMajor]?.includes(oppDepartment) || false;
  };

  const calculateSkillOverlap = (studentSkills, requiredSkills) => {
    if (!studentSkills.length || !requiredSkills.length) return 0;
    const overlap = studentSkills.filter(skill => 
      requiredSkills.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    return overlap / requiredSkills.length;
  };

  const calculateTextSimilarity = (text1, text2) => {
    const words1 = text1.toLowerCase().split(' ');
    const words2 = text2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Student Dashboard</h1>
      
      <div className="section-title">
        Recommended Research Opportunities
        <span className="match-count">{matches.length} matches found</span>
      </div>

      <div className="opportunities-grid">
        {matches.slice(0, 6).map(opportunity => (
          <div key={opportunity.id} className="opportunity-card">
            <div className="opportunity-header">
              <h3>{opportunity.title}</h3>
              <span className={`match-badge ${getMatchClass(opportunity.matchScore)}`}>
                {opportunity.matchScore}% Match
              </span>
            </div>
            <p className="opportunity-faculty">
              {opportunity.faculty_name} • {opportunity.department}
            </p>
            <p className="opportunity-description">
              {opportunity.description?.substring(0, 120)}...
            </p>
            <div className="opportunity-details">
              <span className="detail-item">💰 {opportunity.compensation_type}</span>
              <span className="detail-item">⏱️ {opportunity.time_commitment}</span>
            </div>
            <div className="opportunity-actions">
              <button className="btn-apply">Apply Now</button>
              <button className="btn-view">View Details</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="recent-applications">
        <h2>Recent Applications</h2>
        <div className="applications-list">
          {applications.slice(0, 3).map(app => (
            <div key={app.id} className="application-item">
              <div className="application-info">
                <h4>{app.opportunity_title}</h4>
                <p>{app.faculty_name} • Applied {new Date(app.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`status-badge status-${app.status}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getMatchClass = (score) => {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
};

const OpportunitiesList = ({ opportunities, userType, onApply }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || opp.department === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="main-content">
      <h1 className="page-title">Research Opportunities</h1>
      
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Biology">Biology</option>
          <option value="Psychology">Psychology</option>
        </select>
      </div>

      <div className="opportunities-table">
        <div className="table-header">
          <div>Research Project</div>
          <div>Faculty</div>
          <div>Department</div>
          <div>Compensation</div>
          <div>Actions</div>
        </div>
        
        {filteredOpportunities.map(opportunity => (
          <div key={opportunity.id} className="table-row">
            <div>
              <h4>{opportunity.title}</h4>
              <p className="opportunity-snippet">
                {opportunity.description?.substring(0, 80)}...
              </p>
            </div>
            <div className="faculty-info">
            
              {opportunity.faculty_name}
            </div>
            <div>{opportunity.department}</div>
            <div>
              <span className="compensation-badge">
                {opportunity.compensation_type}
              </span>
            </div>
            <div>
              {userType === 'student' ? (
                <button 
                  className="action-btn btn-apply"
                  onClick={() => onApply(opportunity.id)}
                >
                  Apply
                </button>
              ) : (
                <button className="action-btn btn-view">
                  Manage
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ApplicationsList = ({ applications, userType }) => {
  return (
    <div className="main-content">
      <h1 className="page-title">
        {userType === 'student' ? 'My Applications' : 'Applications Received'}
      </h1>
      
      <div className="section-title">
        List of Applications
        <button className="filter-btn">🔽 Filter</button>
      </div>

      <div className="applications-table">
        <div className="table-header">
          <div>Research Project</div>
          <div>{userType === 'student' ? 'Faculty' : 'Student'}</div>
          <div>Applied Date</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {applications.map(application => (
          <div key={application.id} className="table-row">
            <div>{application.opportunity_title}</div>
            <div className="applicant-info">
              <span className="applicant-icon">
                {userType === 'student' ? '👨‍🏫' : '👨‍🎓'}
              </span>
              {userType === 'student' ? application.faculty_name : application.student_name}
            </div>
            <div>{new Date(application.created_at).toLocaleDateString()}</div>
            <div>
              <span className={`status-badge status-${application.status}`}>
                {application.status}
              </span>
            </div>
            <div>
              <button className="action-btn btn-view">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userType, setUserType] = useState('student'); // 'student' or 'faculty'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {

      loadOpportunities();
      loadApplications();
  }, [user, userType]);

  const loadUserProfile = async (userId) => {
    try {
      // Try to find user in students table first
      const { data: student } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (student) {
        setUserProfile(student);
        setUserType('student');
        return;
      }

      // If not found, try faculty table
      const { data: faculty } = await supabase
        .from('faculty')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (faculty) {
        setUserProfile(faculty);
        setUserType('faculty');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error loading opportunities:', error);
    }
  };

  const loadApplications = async () => {
    try {
      let query = supabase.from('applications').select(`
        *,
        opportunities (title, faculty_name),
        students (name)
      `);

      if (userType === 'student' && userProfile) {
        query = query.eq('student_id', userProfile.id);
      } else if (userType === 'faculty' && userProfile) {
        query = query.eq('faculty_id', userProfile.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data for easier use
      const transformedData = data?.map(app => ({
        ...app,
        opportunity_title: app.opportunities?.title,
        faculty_name: app.opportunities?.faculty_name,
        student_name: app.students?.name
      })) || [];

      setApplications(transformedData);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const handleApply = async (opportunityId) => {
    if (!user || !userProfile || userType !== 'student') {
      alert('Please log in as a student to apply');
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          student_id: userProfile.id,
          opportunity_id: opportunityId,
          status: 'pending'
        });

      if (error) throw error;
      
      alert('Application submitted successfully!');
      loadApplications(); // Reload applications
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return userType === 'student' ? (
          <StudentDashboard 
            student={userProfile} 
            opportunities={opportunities}
            applications={applications}
          />
        ) : (
          <div className="main-content">
            <h1>Faculty Dashboard</h1>
            <p>Welcome to your faculty dashboard!</p>
          </div>
        );
      case 'opportunities':
        return (
          <OpportunitiesList 
            opportunities={opportunities}
            userType={userType}
            onApply={handleApply}
          />
        );
      case 'applications':
        return (
          <ApplicationsList 
            applications={applications}
            userType={userType}
          />
        );
      case 'profile':
        return (
          <div className="main-content">
            <h1>Profile</h1>
            <p>Profile management coming soon...</p>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userType={userType} />
      {renderContent()}
    </div>
  );
};

export default App;