<<<<<<< HEAD
// App.js - Enhanced with Fisk Email Authentication
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import './Login.css';
=======
// App.js - Main Application Component
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51

// Supabase configuration
const supabaseUrl = 'https://srrgioaefwfbynlbnphc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycmdpb2FlZndmYnlubGJucGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2Mzg2NzgsImV4cCI6MjA3MTIxNDY3OH0.7EGDcdqeXr7RoJkm1Gkfo-otxJjq3mxp-5OL71e10JE';
const supabase = createClient(supabaseUrl, supabaseKey);

<<<<<<< HEAD
// Allowed email domains for Fisk University
const ALLOWED_DOMAINS = ['@my.fisk.edu', '@fisk.edu'];

// Utility function to validate Fisk email
const isValidFiskEmail = (email) => {
  if (!email) return false;
  return ALLOWED_DOMAINS.some(domain => email.toLowerCase().endsWith(domain.toLowerCase()));
};

// Login Component
const LoginForm = ({ onLogin, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Fisk email domain
    if (!isValidFiskEmail(email)) {
      setValidationError('Please use a valid Fisk University email (@my.fisk.edu or @fisk.edu)');
      return;
    }
    
    setValidationError('');
    onLogin(email, password, isSignUp);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear validation error when user starts typing a valid email
    if (validationError && isValidFiskEmail(newEmail)) {
      setValidationError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="university-logo large">FU</div>
          <h1>Fisk University Research Portal</h1>
          <p>Connect students with faculty research opportunities</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          
          <div className="form-group">
            <label htmlFor="email">Fisk University Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your.name@my.fisk.edu or your.name@fisk.edu"
              required
              className={validationError ? 'error' : ''}
            />
            {validationError && (
              <span className="error-message">{validationError}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="error-message global-error">{error}</div>
          )}

          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={loading || !isValidFiskEmail(email)}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>

          <div className="login-toggle">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setValidationError('');
              }}
              className="toggle-btn"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>

          <div className="domain-info">
            <small>
              Only Fisk University email addresses (@my.fisk.edu or @fisk.edu) are allowed
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

const Header = ({ user, onLogout, onShowLogin }) => (
  <div className="header">
    <div className="header-left">
      <div className="university-logo">FU</div>
      <span className="header-title">Fisk University Research Portal</span>
=======
// Components
const Header = ({ user, onLogout }) => (
  <div className="header">
    <div className="header-left">
      <div className="university-logo">RU</div>
      <span className="header-title">Research University Portal</span>
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
    </div>
    <div className="header-right">
      {user ? (
        <>
          <span className="user-name">{user.email}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </>
      ) : (
<<<<<<< HEAD
        <button onClick={onShowLogin} className="login-btn">Log In</button>
=======
        <button className="login-btn">Log In</button>
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
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

<<<<<<< HEAD
  const OpportunitiesList = ({ opportunities, userType, onApply }) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    console.log('🎯 OpportunitiesList received opportunities:', opportunities);
    console.log('🎯 Opportunities length:', opportunities.length);

    const filteredOpportunities = opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || opp.department === filter;
      return matchesSearch && matchesFilter;
    });

    console.log('🔍 Filtered opportunities:', filteredOpportunities);

    return (
=======
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
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
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
<<<<<<< HEAD
=======
            
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
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
<<<<<<< HEAD
                  onClick={(e) => {
                    console.log('Apply button clicked!');
                    console.log('Opportunity ID:', opportunity.id);
                    e.preventDefault();
                    onApply(opportunity.id);
                  }}
=======
                  onClick={() => onApply(opportunity.id)}
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
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
<<<<<<< HEAD
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [pendingApplicationId, setPendingApplicationId] = useState(null); // Track which opportunity user wants to apply for
=======
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
<<<<<<< HEAD
      if (session?.user) {
        // Validate that existing user has Fisk email
        if (isValidFiskEmail(session.user.email)) {
          setUser(session.user);
          loadUserProfile(session.user.id);
        } else {
          // Sign out users with non-Fisk emails
          supabase.auth.signOut();
          setAuthError('Access restricted to Fisk University email addresses');
        }
=======
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
      }
      setLoading(false);
    });

    // Listen for auth changes
<<<<<<< HEAD
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Validate Fisk email on auth
        if (isValidFiskEmail(session.user.email)) {
          setUser(session.user);
          setAuthError('');
          setShowLogin(false); // Close login modal on successful auth
          await loadUserProfile(session.user.id);
          
          // If user was trying to apply for an opportunity, open the form
          if (pendingApplicationId) {
            const formsURL = "https://forms.office.com/Pages/ResponsePage.aspx?id=r7XLuAX55EOJBHDMdnZWaFWd4WBzKf9Juxxfjyjzgu1UMTgxTEtNWVM5RUI4UlgwNllBVzNRNVZTUS4u";
            window.open(formsURL, '_blank');
            setPendingApplicationId(null); // Clear the pending application
          }
        } else {
          await supabase.auth.signOut();
          setUser(null);
          setAuthError('Access restricted to Fisk University email addresses');
        }
      } else {
        setUser(null);
        setUserProfile(null);
=======
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    // Load opportunities for everyone (logged in or not)
    loadOpportunities();
    
    // Load applications only for logged in users
    if (user) {
      loadApplications();
    }
  }, [user, userType]);

  const handleLogin = async (email, password, isSignUp) => {
    // Double-check email validation
    if (!isValidFiskEmail(email)) {
      setAuthError('Please use a valid Fisk University email address');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      let result;
      
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        
        if (result.error) throw result.error;
        
        if (result.data?.user && !result.data.session) {
          setAuthError('Please check your email for a verification link');
        }
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (result.error) throw result.error;
      }
      
    } catch (error) {
      console.error('Auth error:', error);
      
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        setAuthError('Invalid email or password');
      } else if (error.message.includes('Email not confirmed')) {
        setAuthError('Please verify your email address before signing in');
      } else if (error.message.includes('User already registered')) {
        setAuthError('An account with this email already exists. Please sign in instead.');
      } else {
        setAuthError(error.message || 'Authentication failed');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    console.log('Loading user profile for:', userId);
    try {
      // Try to find user in students table first
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle instead of single

      console.log('Student query result:', { student, studentError });

      if (student) {
        console.log('Found student profile:', student);
=======

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
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
        setUserProfile(student);
        setUserType('student');
        return;
      }

      // If not found, try faculty table
<<<<<<< HEAD
      const { data: faculty, error: facultyError } = await supabase
        .from('faculty')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle(); // Use maybeSingle instead of single

      console.log('Faculty query result:', { faculty, facultyError });

      if (faculty) {
        console.log('Found faculty profile:', faculty);
        setUserProfile(faculty);
        setUserType('faculty');
        return;
      }

      console.log('No profile found, creating default student profile');
      // If neither exists, create a basic student profile
      const defaultProfile = {
        user_id: userId,
        name: 'New Student',
        major: 'Undeclared'
      };
      setUserProfile(defaultProfile);
      setUserType('student');
      
=======
      const { data: faculty } = await supabase
        .from('faculty')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (faculty) {
        setUserProfile(faculty);
        setUserType('faculty');
      }
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadOpportunities = async () => {
<<<<<<< HEAD
    console.log('Loading opportunities...');
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*');

      console.log('Opportunities query result:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        return;
      }

      console.log('Setting opportunities:', data);
      setOpportunities(data || []);
      
    } catch (error) {
      console.error('Catch block error:', error);
=======
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
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
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
<<<<<<< HEAD
    console.log('Apply button clicked for opportunity:', opportunityId);
    console.log('Current user:', user);
    console.log('User profile:', userProfile);
    console.log('User type:', userType);
    
    // Check if user is logged in
    if (!user || !userProfile || userType !== 'student') {
      console.log('User not authenticated, showing login');
      // Store which opportunity they want to apply for
      setPendingApplicationId(opportunityId);
      // Show login page
      setShowLogin(true);
      return;
    }

    // If user is already logged in, open the form directly
    console.log('User authenticated, opening form');
    const formsURL = "https://forms.office.com/Pages/ResponsePage.aspx?id=r7XLuAX55EOJBHDMdnZWaFWd4WBzKf9Juxxfjyjzgu1UMTgxTEtNWVM5RUI4UlgwNllBVzNRNVZTUS4u";
    window.open(formsURL, '_blank');
  };

const handleLogout = async () => {
  try {
    // Clear Supabase session
    await supabase.auth.signOut();
    
    // Clear all local state
    setUser(null);
    setUserProfile(null);
    setAuthError('');
    setShowLogin(false);
    setPendingApplicationId(null);
    
    // Force reload to clear any cached authentication
    window.location.reload();
  } catch (error) {
    console.error('Logout error:', error);
  }
};
=======
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
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
<<<<<<< HEAD
        return userType === 'student' && user ? (
=======
        return userType === 'student' ? (
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
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

<<<<<<< HEAD
  // Temporarily comment out loading check
  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  // Show full page login when showLogin is true
  if (showLogin && !user) {
    return (
      <LoginForm 
        onLogin={handleLogin}
        loading={authLoading}
        error={authError}
      />
    );
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} onShowLogin={() => setShowLogin(true)} />
=======
  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
>>>>>>> 0bd91dda4dd05959a23dca1d40f4e45f21d82e51
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userType={userType} />
      {renderContent()}
    </div>
  );
};

export default App;