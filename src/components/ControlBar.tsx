import React from 'react'
import { Download, Upload } from 'lucide-react'
import { DashboardState } from '../utils/types'
import { storageManager } from '../utils/storageManager'

interface ControlBarProps {
  state: DashboardState
  onStateLoaded: (state: DashboardState) => voi
