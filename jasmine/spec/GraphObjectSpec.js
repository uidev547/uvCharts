describe('GraphObject', function () {	
	var testGraph = new r3.graph();	
	it('should have the default properties right after construction', function () {
		expect(testGraph.graphdef).toBeUndefined();
		expect(testGraph.config).toEqual(r3.config);
		expect(testGraph.frame).toBeUndefined();
		expect(testGraph.panel).toBeUndefined();
		expect(testGraph.bg).toBeUndefined();
		expect(testGraph.labels).toBeUndefined();
		expect(testGraph.categories).toBeUndefined();		
	});
	
	var initGraph = new r3.graph();
	initGraph.init(r3.constants.defaultHorGraphdef);
});