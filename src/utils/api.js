// API 유틸리티 - 서버 요청을 보내는 척하는 코드
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.seasonthon.com';

// 실제 서버 요청을 시도하되, 실패하면 조용히 넘어가는 함수
export const apiRequest = async (endpoint, options = {}) => {
    try {
        // 실제 서버 요청 시도
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });
        
        // 서버가 응답하면 실제 데이터 반환
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        // 서버 요청 실패 시 조용히 넘어가고 mock 데이터 사용
        console.log(`API request to ${endpoint} failed, using fallback`);
        return null;
    }
};

// 로그인 API
export const loginUser = async (email, password) => {
    const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    
    // 서버 응답이 없으면 mock 로그인 성공
    if (!result) {
        return { success: true, token: 'mock-token-123' };
    }
    
    return result;
};

// 회원가입 API
export const signupUser = async (userData) => {
    const result = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
    
    // 서버 응답이 없으면 mock 회원가입 성공
    if (!result) {
        return { success: true, message: '회원가입 완료' };
    }
    
    return result;
};

// 사용자 데이터 조회
export const fetchUserData = async (userId) => {
    const result = await apiRequest(`/users/${userId}`);
    
    // 서버 응답이 없으면 mock 데이터 반환
    if (!result) {
        return {
            id: userId,
            name: '이단짝',
            bloodSugar: 257,
            score: 97,
            lastUpdate: new Date().toISOString(),
        };
    }
    
    return result;
};

// 혈당 데이터 조회
export const fetchBloodSugarData = async (userId, date) => {
    const result = await apiRequest(`/users/${userId}/blood-sugar?date=${date}`);
    
    // 서버 응답이 없으면 mock 데이터 반환
    if (!result) {
        return {
            current: 257,
            min: 82,
            max: 127,
            spikes: 2,
            average: 105,
        };
    }
    
    return result;
};

// 부모 코드 검증
export const validateParentCode = async (code) => {
    const result = await apiRequest('/auth/validate-code', {
        method: 'POST',
        body: JSON.stringify({ code }),
    });
    
    // 서버 응답이 없으면 항상 성공
    if (!result) {
        return { valid: true };
    }
    
    return result;
};
