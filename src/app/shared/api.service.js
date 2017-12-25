(function() {
    'use strict';
  
    angular
      .module('biweb')
      .factory('API', API);
      
      function API($http, $q, $rootScope, URL, $state, $log) {

        function request(options) {
            var url = options.url || '';
            var params = options.params || {};
            var method = options.method;
            var success = options.success || defaultSuccess;
            var error = options.error || defaultError;
            var complete = options.complete;
            var cache = options.cache || false;
            var responseType = options.responseType || '';
            var deferred = $q.defer();
            var promiseMode = !options.success;
  
            var httpConfig = {
                method: method,
                url: URL.api + '/' + url,
                //headers: { 'Authorization': (($rootScope.userDetails || {}).token_type || '') + ' ' + (($rootScope.userDetails || {}).access_token || '') },
                cache: cache,
                timeout: deferred.promise,
                responseType: responseType
            };
            if ($state.includes('secure')) {
                httpConfig.headers = { 'Authorization': (($rootScope.userDetails || {}).token_type || '') + ' ' + (($rootScope.userDetails || {}).access_token || '') };
            }
  
            if (method === 'GET') {
                httpConfig = angular.extend(httpConfig, { params: params });
            } else {
                httpConfig = angular.extend(httpConfig, { data: params });
            }
  
            $http(httpConfig)
                .success(function (data, a, responseHeaders) {
                    if (success) {
                        success(data, deferred, responseHeaders());
                    }
                    if (complete) {
                        complete(deferred);
                    }
                })
                .error(function (data, status) {
                    if (error) {
                        $log.log(status);
                        error(data, deferred);
                    }
                    if (complete) {
                        complete(deferred);
                    }
                });
  
            if (promiseMode)
                return deferred.promise;
            else
                return deferred;
        }
  
        return {
            get: function (options) {
                options.method = 'GET';
                return request(options);
            },
            post: function (options) {
                options.method = 'POST';
                return request(options);
            },
            put: function (options) {
                options.method = 'PUT';
                return request(options);
            }
        };
  
        function defaultSuccess(data, deferred) {
            deferred.resolve(data);
        }
        function defaultError(data, deferred) {
            deferred.reject(data);
        }
    }

})();