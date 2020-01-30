
/**
 classCoverage
 methodCoverage
 lineCoverage
 coverageUpdatedAt
 coverageUpdatedBy
 */

export  class ServiceStats {
  constructor(
      numberOfTests,
      numberOfTestsUpdatedAt,
      classCoverage,
      methodCoverage,
      lineCoverage,
      coverageUpdatedAt,
      coverageUpdatedBy
      ) {
    this.numberOfTests = numberOfTests;
    this.numberOfTestsUpdatedAt = numberOfTestsUpdatedAt;
    this.classCoverage = classCoverage;
    this.methodCoverage = methodCoverage;
    this.lineCoverage = lineCoverage;
    this.coverageUpdatedAt = coverageUpdatedAt;
    this.coverageUpdatedBy = coverageUpdatedBy;
  }
}