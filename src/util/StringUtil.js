export function getReportPhaseFromPathName(pathname) {
  if(pathname.includes('development')){
    return 'development'
  } else if (pathname.includes('completed')) {
    return 'completed'
  }
}
