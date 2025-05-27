export class QuestSystem {
  constructor() {
    this.currentQuest = null
    this.questHistory = []
    this.availableQuests = []
    this.questProgress = {}
    this.difficultyLevel = 1
    this.userSkillProfile = {}
    
    this.initializeQuests()
  }

  initializeQuests() {
    this.availableQuests = {
      developer: [
        {
          id: 'dev_001',
          title: 'Fix Authentication Bug',
          description: 'Debug and fix a critical authentication issue in the login system',
          difficulty: 1,
          estimatedTime: 15,
          skills: ['JavaScript', 'Debugging', 'Security'],
          scenario: {
            type: 'code_debugging',
            codebase: 'authentication_system',
            bugType: 'security_vulnerability',
            hints: [
              'Check password comparison logic',
              'Look for timing attacks',
              'Verify input validation'
            ]
          },
          objectives: [
            'Identify the security vulnerability',
            'Fix the authentication logic',
            'Add proper input validation',
            'Test the fix with edge cases'
          ],
          scoring: {
            accuracy: 40,
            speed: 30,
            codeQuality: 20,
            testing: 10
          }
        },
        {
          id: 'dev_002',
          title: 'Implement API Integration',
          description: 'Build a new feature that integrates with a third-party payment API',
          difficulty: 2,
          estimatedTime: 25,
          skills: ['JavaScript', 'API Integration', 'Error Handling'],
          scenario: {
            type: 'feature_implementation',
            requirements: 'payment_integration',
            apiDocs: 'stripe_api_mock',
            constraints: ['Rate limiting', 'Error handling', 'Security']
          },
          objectives: [
            'Set up API client configuration',
            'Implement payment processing flow',
            'Add comprehensive error handling',
            'Write unit tests for the integration'
          ],
          scoring: {
            functionality: 35,
            errorHandling: 25,
            codeStructure: 25,
            testing: 15
          }
        },
        {
          id: 'dev_003',
          title: 'Optimize Database Queries',
          description: 'Improve performance of slow database queries in the user dashboard',
          difficulty: 3,
          estimatedTime: 30,
          skills: ['SQL', 'Performance Optimization', 'Database Design'],
          scenario: {
            type: 'performance_optimization',
            database: 'user_analytics',
            slowQueries: ['user_activity_report', 'dashboard_metrics'],
            performanceTarget: '< 100ms response time'
          },
          objectives: [
            'Analyze query execution plans',
            'Identify performance bottlenecks',
            'Optimize queries and add indexes',
            'Validate performance improvements'
          ],
          scoring: {
            performanceGain: 40,
            queryOptimization: 30,
            indexStrategy: 20,
            documentation: 10
          }
        }
      ],
      designer: [
        {
          id: 'des_001',
          title: 'Design SaaS Dashboard',
          description: 'Create a modern, user-friendly dashboard for a SaaS application',
          difficulty: 1,
          estimatedTime: 20,
          skills: ['UI Design', 'User Experience', 'Visual Hierarchy'],
          scenario: {
            type: 'ui_design',
            platform: 'web_application',
            userPersona: 'business_professional',
            requirements: ['Data visualization', 'Navigation', 'Responsive design']
          },
          objectives: [
            'Create wireframes for main dashboard',
            'Design data visualization components',
            'Establish visual hierarchy and typography',
            'Ensure mobile responsiveness'
          ],
          scoring: {
            visualDesign: 35,
            usability: 30,
            creativity: 20,
            responsiveness: 15
          }
        },
        {
          id: 'des_002',
          title: 'Mobile App Onboarding',
          description: 'Design an engaging onboarding flow for a mobile fitness app',
          difficulty: 2,
          estimatedTime: 25,
          skills: ['Mobile Design', 'User Onboarding', 'Interaction Design'],
          scenario: {
            type: 'mobile_design',
            platform: 'ios_android',
            appCategory: 'fitness_health',
            userGoals: ['Quick setup', 'Feature discovery', 'Motivation']
          },
          objectives: [
            'Design welcome and signup screens',
            'Create interactive tutorial flow',
            'Design progress indicators',
            'Optimize for thumb navigation'
          ],
          scoring: {
            userExperience: 40,
            visualAppeal: 25,
            interactionDesign: 25,
            accessibility: 10
          }
        },
        {
          id: 'des_003',
          title: 'E-commerce Checkout Redesign',
          description: 'Redesign checkout process to reduce cart abandonment',
          difficulty: 3,
          estimatedTime: 35,
          skills: ['Conversion Optimization', 'User Psychology', 'A/B Testing'],
          scenario: {
            type: 'conversion_optimization',
            currentConversion: '2.3%',
            targetConversion: '4.0%',
            painPoints: ['Too many steps', 'Unclear pricing', 'Trust issues']
          },
          objectives: [
            'Analyze current checkout flow',
            'Simplify the checkout process',
            'Add trust signals and security indicators',
            'Design A/B test variations'
          ],
          scoring: {
            conversionImpact: 40,
            userFlow: 30,
            trustElements: 20,
            testability: 10
          }
        }
      ],
      manager: [
        {
          id: 'pm_001',
          title: 'Launch Product Feature',
          description: 'Coordinate the launch of a new feature across multiple teams',
          difficulty: 1,
          estimatedTime: 20,
          skills: ['Project Planning', 'Team Coordination', 'Risk Management'],
          scenario: {
            type: 'feature_launch',
            teams: ['Engineering', 'Design', 'QA', 'Marketing'],
            timeline: '6 weeks',
            constraints: ['Limited budget', 'Holiday season', 'Dependency on external API']
          },
          objectives: [
            'Create detailed project timeline',
            'Identify and mitigate risks',
            'Coordinate cross-team dependencies',
            'Plan launch communication strategy'
          ],
          scoring: {
            planning: 35,
            riskManagement: 25,
            teamCoordination: 25,
            communication: 15
          }
        },
        {
          id: 'pm_002',
          title: 'Resolve Team Conflicts',
          description: 'Address conflicts between engineering and design teams on project priorities',
          difficulty: 2,
          estimatedTime: 25,
          skills: ['Conflict Resolution', 'Stakeholder Management', 'Negotiation'],
          scenario: {
            type: 'conflict_resolution',
            stakeholders: ['Engineering Lead', 'Design Director', 'Product Owner'],
            issues: ['Timeline disagreements', 'Resource allocation', 'Quality standards'],
            businessImpact: 'Delayed product launch'
          },
          objectives: [
            'Understand all stakeholder perspectives',
            'Identify root causes of conflict',
            'Facilitate compromise solutions',
            'Establish ongoing communication protocols'
          ],
          scoring: {
            conflictResolution: 40,
            stakeholderSatisfaction: 30,
            solutionViability: 20,
            processImprovement: 10
          }
        },
        {
          id: 'pm_003',
          title: 'Optimize Resource Allocation',
          description: 'Reallocate team resources to meet Q4 delivery commitments',
          difficulty: 3,
          estimatedTime: 30,
          skills: ['Resource Planning', 'Strategic Thinking', 'Data Analysis'],
          scenario: {
            type: 'resource_optimization',
            currentCapacity: '85% utilized',
            q4Commitments: ['3 major features', '2 platform migrations', '1 security audit'],
            constraints: ['No additional hiring', 'Skills gaps in certain areas', 'Vacation schedules']
          },
          objectives: [
            'Analyze current resource utilization',
            'Prioritize Q4 commitments by business value',
            'Create optimal resource allocation plan',
            'Develop contingency plans for risks'
          ],
          scoring: {
            strategicThinking: 35,
            dataAnalysis: 30,
            feasibility: 25,
            contingencyPlanning: 10
          }
        }
      ],
      data: [
        {
          id: 'data_001',
          title: 'Clean Customer Dataset',
          description: 'Process and validate a large customer dataset with quality issues',
          difficulty: 1,
          estimatedTime: 15,
          skills: ['Data Cleaning', 'Excel/Spreadsheets', 'Quality Assurance'],
          scenario: {
            type: 'data_cleaning',
            dataSize: '10,000 records',
            issues: ['Duplicate entries', 'Missing values', 'Format inconsistencies', 'Invalid data'],
            qualityTarget: '95% accuracy'
          },
          objectives: [
            'Identify data quality issues',
            'Remove duplicates and invalid entries',
            'Standardize data formats',
            'Validate final dataset quality'
          ],
          scoring: {
            accuracy: 40,
            completeness: 30,
            consistency: 20,
            efficiency: 10
          }
        },
        {
          id: 'data_002',
          title: 'Executive Dashboard Report',
          description: 'Create a comprehensive dashboard for executive team review',
          difficulty: 2,
          estimatedTime: 25,
          skills: ['Data Visualization', 'Business Intelligence', 'Storytelling'],
          scenario: {
            type: 'dashboard_creation',
            audience: 'C-level executives',
            dataSources: ['Sales', 'Marketing', 'Customer Support', 'Finance'],
            requirements: ['KPI tracking', 'Trend analysis', 'Actionable insights']
          },
          objectives: [
            'Identify key metrics and KPIs',
            'Create compelling visualizations',
            'Build interactive dashboard',
            'Provide actionable recommendations'
          ],
          scoring: {
            visualDesign: 30,
            dataAccuracy: 30,
            insights: 25,
            usability: 15
          }
        },
        {
          id: 'data_003',
          title: 'Predictive Sales Model',
          description: 'Build a model to predict sales performance for next quarter',
          difficulty: 3,
          estimatedTime: 35,
          skills: ['Statistical Analysis', 'Predictive Modeling', 'Data Science'],
          scenario: {
            type: 'predictive_modeling',
            historicalData: '2 years of sales data',
            variables: ['Seasonality', 'Marketing spend', 'Economic indicators', 'Product launches'],
            accuracyTarget: '85% prediction accuracy'
          },
          objectives: [
            'Analyze historical sales patterns',
            'Identify predictive variables',
            'Build and validate prediction model',
            'Create forecast with confidence intervals'
          ],
          scoring: {
            modelAccuracy: 40,
            dataAnalysis: 25,
            methodology: 20,
            interpretation: 15
          }
        }
      ]
    }
  }

  startQuest(role, questId = null) {
    const roleQuests = this.availableQuests[role]
    if (!roleQuests || roleQuests.length === 0) {
      throw new Error(`No quests available for role: ${role}`)
    }

    let selectedQuest
    if (questId) {
      selectedQuest = roleQuests.find(q => q.id === questId)
      if (!selectedQuest) {
        throw new Error(`Quest ${questId} not found for role ${role}`)
      }
    } else {
      // Select quest based on difficulty level and user skill profile
      selectedQuest = this.selectOptimalQuest(roleQuests)
    }

    this.currentQuest = {
      ...selectedQuest,
      startTime: Date.now(),
      progress: 0,
      completedObjectives: [],
      currentObjective: 0,
      score: 0,
      hints: [],
      actions: []
    }

    return this.currentQuest
  }

  selectOptimalQuest(quests) {
    // Filter quests by appropriate difficulty
    const suitableQuests = quests.filter(quest => {
      const difficultyRange = this.getDifficultyRange()
      return quest.difficulty >= difficultyRange.min && quest.difficulty <= difficultyRange.max
    })

    if (suitableQuests.length === 0) {
      return quests[0] // Fallback to first quest
    }

    // Select based on user skill profile if available
    if (Object.keys(this.userSkillProfile).length > 0) {
      return this.selectBySkillMatch(suitableQuests)
    }

    // Random selection from suitable quests
    return suitableQuests[Math.floor(Math.random() * suitableQuests.length)]
  }

  getDifficultyRange() {
    // Adjust difficulty based on user performance
    const baseLevel = this.difficultyLevel
    return {
      min: Math.max(1, baseLevel - 1),
      max: Math.min(3, baseLevel + 1)
    }
  }

  selectBySkillMatch(quests) {
    // Score quests based on skill match
    const scoredQuests = quests.map(quest => {
      const skillMatch = quest.skills.reduce((score, skill) => {
        return score + (this.userSkillProfile[skill] || 0)
      }, 0) / quest.skills.length

      return { quest, score: skillMatch }
    })

    // Sort by skill match and select top quest
    scoredQuests.sort((a, b) => b.score - a.score)
    return scoredQuests[0].quest
  }

  updateProgress(action) {
    if (!this.currentQuest) return

    this.currentQuest.actions.push({
      type: action.type,
      timestamp: Date.now(),
      data: action.data
    })

    // Update objective progress
    this.evaluateObjectiveCompletion(action)
    
    // Calculate overall progress
    this.currentQuest.progress = this.currentQuest.completedObjectives.length / this.currentQuest.objectives.length

    // Update score
    this.updateScore(action)

    return this.currentQuest
  }

  evaluateObjectiveCompletion(action) {
    const currentObjectiveIndex = this.currentQuest.currentObjective
    const objective = this.currentQuest.objectives[currentObjectiveIndex]

    if (!objective) return

    // Simple objective completion logic (can be enhanced)
    const isCompleted = this.checkObjectiveCompletion(objective, action)
    
    if (isCompleted && !this.currentQuest.completedObjectives.includes(currentObjectiveIndex)) {
      this.currentQuest.completedObjectives.push(currentObjectiveIndex)
      this.currentQuest.currentObjective = Math.min(
        currentObjectiveIndex + 1,
        this.currentQuest.objectives.length - 1
      )
    }
  }

  checkObjectiveCompletion(objective, action) {
    // This is a simplified check - in a real implementation,
    // this would be much more sophisticated
    const objectiveKeywords = objective.toLowerCase().split(' ')
    const actionData = JSON.stringify(action.data).toLowerCase()
    
    return objectiveKeywords.some(keyword => actionData.includes(keyword))
  }

  updateScore(action) {
    if (!this.currentQuest) return

    const scoring = this.currentQuest.scoring
    const timeElapsed = Date.now() - this.currentQuest.startTime
    const timeBonus = Math.max(0, 1 - (timeElapsed / (this.currentQuest.estimatedTime * 60 * 1000)))

    // Base score calculation
    let baseScore = 0
    Object.keys(scoring).forEach(criteria => {
      baseScore += this.evaluateCriteria(criteria, action) * scoring[criteria]
    })

    // Apply time bonus
    this.currentQuest.score = Math.round(baseScore * (1 + timeBonus * 0.2))
  }

  evaluateCriteria(criteria, action) {
    // Simplified criteria evaluation
    // In a real implementation, this would analyze the actual work done
    switch (criteria) {
      case 'accuracy':
        return Math.random() * 0.3 + 0.7 // 70-100%
      case 'speed':
        return Math.random() * 0.4 + 0.6 // 60-100%
      case 'creativity':
        return Math.random() * 0.5 + 0.5 // 50-100%
      case 'functionality':
        return Math.random() * 0.3 + 0.7 // 70-100%
      default:
        return Math.random() * 0.4 + 0.6 // 60-100%
    }
  }

  completeQuest() {
    if (!this.currentQuest) return null

    const completedQuest = {
      ...this.currentQuest,
      endTime: Date.now(),
      completed: true,
      finalScore: this.currentQuest.score
    }

    // Update user skill profile
    this.updateSkillProfile(completedQuest)
    
    // Adjust difficulty for next quest
    this.adjustDifficulty(completedQuest)

    // Add to history
    this.questHistory.push(completedQuest)

    // Clear current quest
    this.currentQuest = null

    return completedQuest
  }

  updateSkillProfile(completedQuest) {
    const performanceRatio = completedQuest.finalScore / 100
    
    completedQuest.skills.forEach(skill => {
      if (!this.userSkillProfile[skill]) {
        this.userSkillProfile[skill] = 0
      }
      
      // Update skill level based on performance
      this.userSkillProfile[skill] = Math.min(1, this.userSkillProfile[skill] + performanceRatio * 0.1)
    })
  }

  adjustDifficulty(completedQuest) {
    const performanceRatio = completedQuest.finalScore / 100
    
    if (performanceRatio > 0.9) {
      this.difficultyLevel = Math.min(3, this.difficultyLevel + 0.2)
    } else if (performanceRatio < 0.6) {
      this.difficultyLevel = Math.max(1, this.difficultyLevel - 0.1)
    }
  }

  getCurrentQuest() {
    return this.currentQuest
  }

  getQuestHistory() {
    return this.questHistory
  }

  getAvailableQuests(role) {
    return this.availableQuests[role] || []
  }

  getUserSkillProfile() {
    return this.userSkillProfile
  }

  getDifficultyLevel() {
    return this.difficultyLevel
  }

  addHint(hint) {
    if (this.currentQuest) {
      this.currentQuest.hints.push({
        text: hint,
        timestamp: Date.now()
      })
    }
  }

  getHints() {
    return this.currentQuest ? this.currentQuest.hints : []
  }

  reset() {
    this.currentQuest = null
    this.questHistory = []
    this.questProgress = {}
    this.difficultyLevel = 1
    this.userSkillProfile = {}
  }
}
